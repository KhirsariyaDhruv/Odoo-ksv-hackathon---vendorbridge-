import express from 'express';
import prisma from '../prisma.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get all RFQs
router.get('/', async (req, res) => {
  try {
    const rfqs = await prisma.rFQ.findMany({
      include: {
        user: { select: { firstName: true, lastName: true } },
        _count: { select: { quotations: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(rfqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create an RFQ
router.post('/', async (req, res) => {
  try {
    const { title, category, deadline, description } = req.body;
    
    const rfq = await prisma.rFQ.create({
      data: {
        title,
        category,
        deadline: new Date(deadline),
        description,
        createdBy: req.user.userId
      }
    });
    
    res.status(201).json(rfq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
