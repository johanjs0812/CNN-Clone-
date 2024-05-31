import mongoose from 'mongoose';

const username: string = "johanfpt";
const pass: string = "PTm5heDcofZopkhG";
const database: string = "cnn";

const uri: string = `mongodb+srv://${username}:${pass}@johanfpt.n5dn4s4.mongodb.net/${database}?retryWrites=true&w=majority&appName=johanfpt`;

async function connectToDb(): Promise<void> {
    console.log('Connecting to the database...');
    try {
        await mongoose.connect(uri);
        console.log('Database is connected successfully !');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};


export { connectToDb };
