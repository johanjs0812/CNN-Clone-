import mongoose from 'mongoose';
import { Categories, ICategory, ISubcategory } from '../models/catgories';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

const collectionInstance = new Categories();

function createDataFromRequest(req: Request): ICategory | null {
    if (!req.body.name || !req.body.slug) {
        return null;
    }

    const subcategories: ISubcategory[] = req.body.subcategories
        ? req.body.subcategories.map((sub: any) => ({
            _id: new mongoose.Types.ObjectId(),
            name: sub.name,
            slug: sub.slug,
        }))
        : [];

    const now = new Date();

    return {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        slug: req.body.slug,
        subcategories: subcategories,
        createdAt: now,
        updatedAt: now,
    } as ICategory;
}

function editDataFromRequest(req: Request): ICategory | null {
    if (!req.body.name || !req.body.slug) {
        console.log('kocogi')
        return null;
    }

    const now = new Date();

    const subcategories: ISubcategory[] = req.body.subcategories
        ? req.body.subcategories.map((sub: any) => ({
            _id: sub._id,
            name: sub.name,
            slug: sub.slug,
        }))
        : [];

    return {
        name: req.body.name,
        slug: req.body.slug,
        subcategories: subcategories,
        updatedAt: now,
    } as ICategory;
}

export const AddSubcategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mainCategoryId: string = req.params.parentId;
        const now = new Date();
        const newData ={
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            slug: req.body.slug,
            createdAt: now,
            updatedAt: now
        }  as ICategory;

        console.log('updatedCategory', mainCategoryId, newData);

        const updatedCategory = await collectionInstance.addSubcollection(mainCategoryId, newData);
        console.log(updatedCategory);
        if (!updatedCategory) {
            return res.status(404).json({ error: 'No category or subcategory found with the provided IDs' });
        }

        const dataObjects = updatedCategory.toJSON();
        res.status(200).json(dataObjects);

    } catch (err) {
        console.error('Failed to update subcategory', err);
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
};

export const UpdateSubcategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mainCategoryId: string = req.params.parentId;
        const subcategoryIdToUpdate: string = req.params.subcategoryId;
        const now = new Date();
        const newData ={
            name: req.body.name,
            slug: req.body.slug,
            updatedAt: now
        }  as ICategory;

        const updatedCategory = await collectionInstance.updateSubcollection(mainCategoryId, subcategoryIdToUpdate, newData);

        if (!updatedCategory) {
            return res.status(404).json({ error: 'No category or subcategory found with the provided IDs' });
        }

        const dataObjects = updatedCategory.toJSON();
        res.status(200).json(dataObjects);

    } catch (err) {
        console.error('Failed to update subcategory', err);
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
};

export const DeleteSubcategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mainCategoryId: string = req.params.parentId;
        const subcategoryIdToUpdate: string = req.params.subcategoryId;
        
        const updatedCategory = await collectionInstance.deleteSubcollection(mainCategoryId, subcategoryIdToUpdate);

        if (!updatedCategory) {
            return res.status(404).json({ error: 'No category or subcategory found with the provided IDs' });
        }

        res.status(200).json(updatedCategory);
    } catch (err) {
        console.error('Failed to update subcategory', err);
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
};

export const Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const data = editDataFromRequest(req);
        const respondata = await collectionInstance.update(id, data as any as ICategory);

        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        };

        const dataObjects = respondata.toJSON();
        console.log('ctr', dataObjects)
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    console.log('body',req.body);
    try {
        const data = createDataFromRequest(req);
        console.log('data', data);

        if (!data) {
            return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
        }

        const respondata = await collectionInstance.add(data as any as ICategory);
        console.log('res', respondata);
        if (!respondata) {
            console.error('Không thể tạo mới cate');
            return res.status(500).json({ error: 'Không thể tạo mới cate' });
        }
        const dataObjects = respondata.toJSON();
        res.json(dataObjects);
    } catch (err) {
        console.error('Không thể tạo mới cate', err);
        res.status(500).json({ error: 'Không thể tạo mới cate' });
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
        dataObjects.forEach(items => {
            items.createdAt = moment(items.createdAt).format('DD/MM/YYYY HH:mm');
            items.updatedAt = moment(items.updatedAt).format('DD/MM/YYYY HH:mm');
        
            for (const sub in items.subcategories) {
                const subcategory = items.subcategories[sub];
                subcategory.createdAt = moment(subcategory.createdAt).format('DD/MM/YYYY HH:mm');
                subcategory.updatedAt = moment(subcategory.updatedAt).format('DD/MM/YYYY HH:mm');
            }
        });        
        
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
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
        dataObjects.createdAt = moment(dataObjects.createdAt).format('DD/MM/YYYY HH:mm');
        dataObjects.updatedAt = moment(dataObjects.updatedAt).format('DD/MM/YYYY HH:mm');
        for (const sub in dataObjects.subcategories) {
            const subcategory = dataObjects.subcategories[sub];
            subcategory.createdAt = moment(subcategory.createdAt).format('DD/MM/YYYY HH:mm');
            subcategory.updatedAt = moment(subcategory.updatedAt).format('DD/MM/YYYY HH:mm');
        };
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
        console.log('?',respondata);
        res.json(respondata);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
};