"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = require("../controllers/comment");
const commentRouter = express_1.default.Router();
commentRouter.get('/api/cnn/comments', comment_1.getData);
commentRouter.put('/api/cnn/comments/edit/:id', comment_1.Update);
commentRouter.post('/api/cnn/comments/post/:art', comment_1.add);
// commentRouter.delete('/api/cnn/comments/delete/:id', Delete);
commentRouter.delete('/api/cnn/cmt/articles/delete/:id/:cmtOnArt/:Art', comment_1.Delete);
commentRouter.get('/api/cnn/comments/onArt/:artid', comment_1.getAllCommentsFromArticle);
exports.default = commentRouter;
