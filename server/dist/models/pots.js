"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collections_1 = require("./collections");
const postSchema = new mongoose_1.default.Schema({
    title: String,
    name: String,
    subcategories: [String],
    description: String,
}, { versionKey: false });
class posts extends collections_1.BaseCollection {
    constructor() {
        super('articles', postSchema);
    }
}
exports.posts = posts;
