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

    const po = await prisma.purchaseOrder.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json(po);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
