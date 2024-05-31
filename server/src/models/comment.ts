import mongoose, { Document, Model, Schema } from 'mongoose';
import {BaseCollection } from './collections';

export interface Ibasethiscollection extends Document {
    content: string;
    createdAt?: Date;
    updatedAt?: Date; 
    user: string;
}

const postSchema: Schema = new mongoose.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, 
    user: String
}, { versionKey: false });

export class Comment  extends BaseCollection<Ibasethiscollection> {
    constructor() {
        super('comments', postSchema);
    }

}