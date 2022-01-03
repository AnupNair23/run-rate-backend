import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// "mongodb://localhost:27017/haasyl_dev"

function dbConnect(reason) {
    const url = process.env.DEV_MONGODB_URL;
    mongoose
        .connect(process.env.DEV_MONGODB_URL)
        .then(() => {
            console.log('Database connection successful');
        })
        .catch((err) => {
            console.log('Database connection error', err);
        });
}
export default dbConnect;
