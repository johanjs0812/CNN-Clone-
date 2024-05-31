import mongoose, { Document, Model, Schema } from 'mongoose';
import {BaseCollection } from './collections';

export interface Ibasethiscollection extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
}

const postSchema: Schema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: String,
}, { versionKey: false });

export class Users  extends BaseCollection<Ibasethiscollection> {
    constructor() {
        super('users', postSchema);
    }
    
    async getLogin(email: string, password: string): Promise<{user: Ibasethiscollection | null, emailExists: boolean, passwordMatches: boolean}> {
        const result = { user: null as Ibasethiscollection | null, emailExists: false, passwordMatches: false };
        console.log('band', email, password)
        try {
            const userResult = await this.model.findOne({ email }) as Ibasethiscollection;
            console.log('user', userResult) 
    
            if (userResult) {
                result.user = userResult;
                result.emailExists = true;
                result.passwordMatches = (userResult.password === password);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
        
        return result;
    };    
    
}