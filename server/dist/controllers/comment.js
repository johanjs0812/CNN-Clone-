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
exports.getAllCommentsFromArticle = exports.Delete = exports.getData = exports.add = exports.Update = void 0;
const comment_1 = require("../models/comment");
const articles_1 = require("../models/articles");
const collectionInstance = new comment_1.Comment();
const ArtofCmt = new articles_1.Articles();
function createDataFromRequest(req, create) {
    const now = new Date();
    return {
        content: req.body.content,
        createdAt: now,
        updatedAt: now,
        user: req.body.user
    };
}
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const now = new Date();
        const data = {
            content: req.body.content,
            updatedAt: now,
        };
        console.log('id', id);
        const respondata = yield collectionInstance.updateComment(id, data);
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'not found' });
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
        const newId = dataObjects._id;
        console.log('Newly added id:', newId);
        const art = req.params.art;
        if (!art) {
            console.error('Art không tồn tại');
            return res.status(400).json({ error: 'Art không tồn tại' });
        }
        const resacp = yield ArtofCmt.addSubcmtOnArt(art, newId);
        if (!resacp) {
            console.error('Không thể thêm comment vào art');
            return res.status(500).json({ error: 'Không thể thêm comment vào art' });
        }
        return res.json(dataObjects);
    }
    catch (err) {
        console.error('Không thể tạo mới', err);
        res.status(500).json({ error: 'Không thể tạo mới' });
    }
});
exports.add = add;
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respondata = yield collectionInstance.fetchAll();
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return undefined;
        }
        const dataObjects = respondata.map(items => items.toJSON());
        res.json(dataObjects);
    }
    catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
});
exports.getData = getData;
const Delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const cmtOnArt = req.params.cmtOnArt;
        const Art = req.params.Art;
        const respondata = yield collectionInstance.delete(id);
        const respondataArt = yield ArtofCmt.deleteSubcmtOnArt(Art, cmtOnArt);
        if (!respondata) {
            console.error('Failed to fetch data');
            return res.status(404).json({ error: 'data not found' });
        }
        ;
        if (!respondataArt) {
            console.error('Failed to fetch data');
            return res.status(404).json({ error: 'data not found' });
        }
        ;
        res.json({ respondata: respondata, respondataArt: respondataArt });
    }
    catch (err) {
        console.error('Failed to fetch data', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
exports.Delete = Delete;
const getAllCommentsFromArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield ArtofCmt.getId(req.params.artid);
        if (!article || !article.comments) {
            console.error('Article not found or no comments in the article');
            res.status(404).send('Article not found or no comments in the article');
            return;
        }
        const comments = yield collectionInstance.getCommentOnArt(article.comments);
        if (comments) {
            res.status(200).json(comments);
        }
    }
    catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send(`Error: ${error}`);
    }
});
exports.getAllCommentsFromArticle = getAllCommentsFromArticle;
