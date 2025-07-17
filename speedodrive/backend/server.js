// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(cors({
    origin: 'http://localhost:5500', // your frontend port
    credentials: true
}));
app.use(express.json());

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`🚀 Backend running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
});
