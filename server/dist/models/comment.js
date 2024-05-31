"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collections_1 = require("./collections");
const postSchema = new mongoose_1.default.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: String
}, { versionKey: false });
class Comment extends collections_1.BaseCollection {
    constructor() {
        super('comments', postSchema);
    }
}
exports.Comment = Comment;
