import {Comment, Ibasethiscollection} from '../models/comment';
import { Articles, Ibasethiscollection as ArtInterface } from '../models/articles';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

const collectionInstance = new Comment();
const ArtofCmt = new Articles();

interface IbaseInterface {
    content: string;
    createdAt?: Date;
    updatedAt?: Date; 
    user: string;
}

function createDataFromRequest(req: Request, create?: Date ): IbaseInterface {
    const now = new Date();
    return {
        content: req.body.content,
        createdAt: now,
        updatedAt: now,
        user: req.body.user
    };
}

export const Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;

        const now = new Date();

        const data = {
            content: req.body.content,
            updatedAt: now,
        };

        console.log('id', id)
        
        const respondata = await collectionInstance.updateComment(id, data as Ibasethiscollection);

        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'not found' });
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

        const newId = dataObjects._id; 
        console.log('Newly added id:', newId);

        const art: string = req.params.art;

        if (!art) {
            console.error('Art không tồn tại');
            return res.status(400).json({ error: 'Art không tồn tại' });
        }

        const resacp = await ArtofCmt.addSubcmtOnArt(art, newId);

        if (!resacp) {
            console.error('Không thể thêm comment vào art');
            return res.status(500).json({ error: 'Không thể thêm comment vào art' });
        }

        return res.json(dataObjects);
        
    } catch (err) {
        console.error('Không thể tạo mới', err);
        res.status(500).json({ error: 'Không thể tạo mới' });
    }
};

export const getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const respondata = await collectionInstance.fetchAll();
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return undefined;
        }
        const dataObjects = respondata.map(items => items.toJSON());
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
};

export const Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const cmtOnArt: string = req.params.cmtOnArt;
        const Art: string = req.params.Art;

        const respondata = await collectionInstance.delete(id);
        const respondataArt = await ArtofCmt.deleteSubcmtOnArt(Art, cmtOnArt);

        if (!respondata) {
            console.error('Failed to fetch data');
            return res.status(404).json({ error: 'data not found' });
        };

        if (!respondataArt) {
            console.error('Failed to fetch data');
            return res.status(404).json({ error: 'data not found' });
        };

        res.json({ respondata: respondata, respondataArt: respondataArt });

    } catch (err) {
        console.error('Failed to fetch data', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

export const getAllCommentsFromArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const article = await ArtofCmt.getId(req.params.artid) as ArtInterface | null;

        if (!article || !article.comments) {
            console.error('Article not found or no comments in the article');
            res.status(404).send('Article not found or no comments in the article');
            return;
        }

        const comments = await collectionInstance.getCommentOnArt(article.comments);
        if (comments) {
            res.status(200).json(comments);
        }
    } catch (error) { 
        console.error(`Error: ${error}`);
        res.status(500).send(`Error: ${error}`);
    }
};
