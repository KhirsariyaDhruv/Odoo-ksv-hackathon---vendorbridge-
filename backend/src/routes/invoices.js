import express from 'express';
import prisma from '../prisma.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        vendor: { select: { name: true, init: true, category: true, email: true, phone: true, gstNumber: true } },
        purchaseOrder: {
          select: { poNumber: true, status: true, quotation: { include: { rfq: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(invoices);
  } catch (error) {
    console.error('Fetch invoices error:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Get a specific invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: { id: parseInt(id) },
      include: {
        vendor: { select: { id: true, name: true, init: true, category: true, email: true, phone: true, gstNumber: true } },
        purchaseOrder: {
          include: {
            quotation: {
              include: {
                rfq: true
              }
            }
          }
        }
      }
    });
    
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    res.json(invoice);
  } catch (error) {
    console.error('Fetch invoice error:', error);
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
});

// Update invoice status (e.g. to Paid)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedInvoice = await prisma.invoice.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    
    // Also update the PO status if the invoice is paid
    if (status === 'Paid') {
      await prisma.purchaseOrder.update({
        where: { id: updatedInvoice.purchaseOrderId },
        data: { status: 'Paid' }
      });
    }

    res.json(updatedInvoice);
  } catch (error) {
    console.error('Update invoice status error:', error);
    res.status(500).json({ error: 'Failed to update invoice status' });
  }
});

export default router;
