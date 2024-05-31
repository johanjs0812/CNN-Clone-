import {Articles, Ibasethiscollection} from '../models/articles';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

const collectionInstance = new Articles();

interface IbaseInterface {
    title: string;
    content: string;
    img: string;
    categoryId: string;
    comments: string[];
    createdAt?: Date;
    updatedAt?: Date; 
}

function createDataFromRequest(req: Request): IbaseInterface {
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

export const Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const now = new Date();
        const id: string = req.params.id;
        const data = {
            title: req.body.title,
            content: req.body.content,
            img: req.body.img,
            categoryId: req.body.categoryId,
            updatedAt: now
        };
        
        const respondata = await collectionInstance.updateArt(id, data as Ibasethiscollection);

        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        };

        const dataObjects = respondata.toJSON();
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = createDataFromRequest(req);

        const respondata = await collectionInstance.add(data as Ibasethiscollection);

        if (!respondata) {
            console.error('Không thể tạo mới');
            return res.status(500).json({ error: 'Không thể tạo mới' });
        }

        const dataObjects = respondata.toJSON();
        res.json(dataObjects);
    } catch (err) {
        console.error('Không thể tạo mới', err);
        res.status(500).json({ error: 'Không thể tạo mới ' });
    }
};

export const getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const respondata = await collectionInstance.fetchAll();
        if (!respondata) {
            console.error('Failed to fetch data');
            return undefined;
        }
        const dataObjects = respondata.map(items => items.toJSON());
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

export const getDataId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const respondata = await collectionInstance.getId(id);
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        }
        const dataObjects = respondata.toJSON();
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
};

export const Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const respondata = await collectionInstance.delete(id);
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(respondata);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
};

export const getArticlesByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: string = req.params.id as string;
        if (!categoryId) {
            return res.status(400).json({ error: 'No categoryId provided' });
        }
        const articles = await collectionInstance.getArticlesByCategoryId(categoryId);
        
        if (!articles) {
            console.error('Failed to fetch articles');
            return res.status(404).json({ error: 'No articles found for this category' });
        }
        const articleObjects = articles.map(article => {
            const articleObject = article.toJSON();
            return articleObject;
        });
        res.json(articleObjects);
    } catch (err) {
        console.error('Failed to fetch articles', err);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};
