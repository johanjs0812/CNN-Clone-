import mongoose, { Document, Model, Schema } from 'mongoose';
import {BaseCollection } from './collections';

export interface ISubcategory extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    createdAt?: Date; 
    updatedAt?: Date; 
}
export interface ICategory extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    subcategories: ISubcategory[];
    createdAt?: Date;
    updatedAt?: Date; 
}

const SubcategorySchema: Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    slug: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, 
}, { _id: false });

const CategorySchema: Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    slug: String,
    subcategories: [SubcategorySchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });

export class Categories extends BaseCollection<ICategory> {
    constructor() {
        super('categories', CategorySchema);
    }
}