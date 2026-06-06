import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import vendorRoutes from './routes/vendors.js';
import rfqRoutes from './routes/rfqs.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/rfqs', rfqRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'VendorBridge Backend is running' });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.on('error', (err) => {
  console.error('Server error:', err);
});
