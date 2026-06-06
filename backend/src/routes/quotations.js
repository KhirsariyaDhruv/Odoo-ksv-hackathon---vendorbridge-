import express from 'express';
import prisma from '../prisma.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get all quotations (for current user's role)
router.get('/', async (req, res) => {
  try {
    const quotations = await prisma.quotation.findMany({
      include: {
        vendor: { select: { name: true, init: true, category: true } },
        rfq: { select: { title: true, category: true } }
      },
      orderBy: { submittedAt: 'desc' }
    });
    res.json(quotations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a quotation (for vendors, but right now acting as general create)
router.post('/', async (req, res) => {
  try {
    const { rfqId, vendorId, amount } = req.body;
    
    const quotation = await prisma.quotation.create({
      data: {
        rfqId: parseInt(rfqId),
        vendorId: parseInt(vendorId),
        amount: parseFloat(amount)
      }
    });
    
    res.status(201).json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update quotation status (Approve/Reject)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Approved" or "Rejected"

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const quotation = await prisma.quotation.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    if (status === 'Approved') {
      // Generate PO
      await prisma.purchaseOrder.create({
        data: {
          poNumber: `PO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          quotationId: quotation.id,
          vendorId: quotation.vendorId,
          amount: quotation.amount,
          status: 'Pending Approval'
        }
      });
    }

    res.json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
