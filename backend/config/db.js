const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/TeamTaskManager';
        
        await mongoose.connect(dbURI, {
            serverSelectionTimeoutMS: 10000, // 10 seconds tak wait karega
            socketTimeoutMS: 45000,
        });
        
        console.log('MongoDB Connected Successfully!');
    } catch (err) {
        console.error('Database connection error:', err.message);
        // Crash hone ke bajaye process ko thodi der baad retry karne dein
        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB;