import mongoose, { Document, Model, Schema } from 'mongoose';
import {BaseCollection } from './collections';

export interface Ibasethiscollection extends Document {
    title: string;
    content: string;
    img: string;
    categoryId: string;
    comments: string[];
    createdAt?: Date;
    updatedAt?: Date; 
}

const postSchema: Schema = new mongoose.Schema({
    title: String,
    content: String,
    img: String,
    categoryId: String,
    comments: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, 
}, { versionKey: false });

export class Articles  extends BaseCollection<Ibasethiscollection> {
    constructor() {
        super('articles', postSchema);
    }
}