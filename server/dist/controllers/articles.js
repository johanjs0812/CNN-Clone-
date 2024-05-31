"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticlesByCategoryId = exports.Delete = exports.getDataId = exports.getData = exports.add = exports.Update = void 0;
const articles_1 = require("../models/articles");
const collectionInstance = new articles_1.Articles();
function createDataFromRequest(req) {
    const now = new Date();
    return {
        title: req.body.title,
        content: req.body.content,
        img: req.body.img,
        categoryId: req.body.categoryId,
        comments: req.body.comments,
        createdAt: now,
        updatedAt: now
    };
}
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        const id = req.params.id;
        const data = {
            title: req.body.title,
            content: req.body.content,
            img: req.body.img,
            categoryId: req.body.categoryId,
            updatedAt: now
        };
        const respondata = yield collectionInstance.updateArt(id, data);
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        }
        ;
        const dataObjects = respondata.toJSON();
        res.json(dataObjects);
    }
    catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
});
exports.Update = Update;
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = createDataFromRequest(req);
        const respondata = yield collectionInstance.add(data);
        if (!respondata) {
            console.error('Không thể tạo mới');
            return res.status(500).json({ error: 'Không thể tạo mới' });
        }
        const dataObjects = respondata.toJSON();
        res.json(dataObjects);
    }
    catch (err) {
        console.error('Không thể tạo mới', err);
        res.status(500).json({ error: 'Không thể tạo mới ' });
    }
});
exports.add = add;
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respondata = yield collectionInstance.fetchAll();
        if (!respondata) {
            console.error('Failed to fetch data');
            return undefined;
        }
        const dataObjects = respondata.map(items => items.toJSON());
        res.json(dataObjects);
    }
    catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
exports.getData = getData;
const getDataId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const respondata = yield collectionInstance.getId(id);
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        }
        const dataObjects = respondata.toJSON();
        res.json(dataObjects);
    }
    catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
});
exports.getDataId = getDataId;
const Delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const respondata = yield collectionInstance.delete(id);
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(respondata);
    }
    catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
});
exports.Delete = Delete;
const getArticlesByCategoryId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(400).json({ error: 'No categoryId provided' });
        }
        const articles = yield collectionInstance.getArticlesByCategoryId(categoryId);
        if (!articles) {
            console.error('Failed to fetch articles');
            return res.status(404).json({ error: 'No articles found for this category' });
        }
        const articleObjects = articles.map(article => {
            const articleObject = article.toJSON();
            return articleObject;
        });
        res.json(articleObjects);
    }
    catch (err) {
        console.error('Failed to fetch articles', err);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});
exports.getArticlesByCategoryId = getArticlesByCategoryId;
