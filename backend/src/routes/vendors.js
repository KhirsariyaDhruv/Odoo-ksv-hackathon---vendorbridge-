import express from 'express';
import prisma from '../prisma.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a vendor
router.post('/', async (req, res) => {
  try {
    const { name, init, category, gstNumber, email, phone } = req.body;
    
    const existingVendor = await prisma.vendor.findUnique({ where: { gstNumber } });
    if (existingVendor) {
      return res.status(400).json({ error: 'Vendor with this GST Number already exists' });
    }

    const vendor = await prisma.vendor.create({
      data: {
        name,
        init,
        category,
        gstNumber,
        email,
        phone,
      }
    });
    
    res.status(201).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
