"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collections_1 = require("./collections");
const postSchema = new mongoose_1.default.Schema({
    title: String,
    content: String,
    img: String,
    categoryId: String,
    comments: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });
class Articles extends collections_1.BaseCollection {
    constructor() {
        super('articles', postSchema);
    }
}
exports.Articles = Articles;
