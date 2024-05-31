"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articles_1 = require("../controllers/articles");
const articlesRouter = express_1.default.Router();
articlesRouter.get('/api/cnn/articles', articles_1.getData);
articlesRouter.get('/api/cnn/listnews/:id', articles_1.getArticlesByCategoryId);
articlesRouter.get('/api/cnn/pots/:id', articles_1.getDataId);
articlesRouter.put('/api/cnn/articles/edit/:id', articles_1.Update);
articlesRouter.post('/api/cnn/articles/post/', articles_1.add);
articlesRouter.delete('/api/cnn/articles/delete/:id', articles_1.Delete);
exports.default = articlesRouter;
