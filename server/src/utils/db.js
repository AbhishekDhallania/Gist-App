import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ quiet: true })

const dburl = process.env.MONGODB_URL
async function main() {
    try {
        await mongoose.connect(dburl);
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("MongoDB Connection Failed", error);
    }
}

export default main
