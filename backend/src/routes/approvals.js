import express from 'express';
import prisma from '../prisma.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get pending purchase orders
router.get('/', async (req, res) => {
  try {
    const pos = await prisma.purchaseOrder.findMany({
      where: { status: 'Pending Approval' },
      include: {
        vendor: { select: { name: true, init: true, category: true } },
        quotation: { 
          include: { rfq: { select: { title: true, description: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(pos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update PO status (Approve/Reject)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Approved" or "Rejected"

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const poId = parseInt(id);

    const po = await prisma.purchaseOrder.update({
      where: { id: poId },
      data: { status },
      include: { vendor: true }
    });

    if (status === 'Approved') {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30); // Net 30 terms

      await prisma.invoice.create({
        data: {
          invoiceNumber: `INV-${Date.now().toString().slice(-6)}-${po.id}`,
          purchaseOrderId: po.id,
          vendorId: po.vendorId,
          amount: po.amount,
          dueDate: dueDate,
          status: 'Pending Payment'
        }
      });
    }

    res.json(po);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
