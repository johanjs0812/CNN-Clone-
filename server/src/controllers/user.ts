import {Users, Ibasethiscollection} from '../models/user';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

const collectionInstance = new Users();

interface IbaseInterface {
    username: string;
    email: string;
    password: string;
    role: string;
}

function createDataFromRequest(req: Request): IbaseInterface {
    return {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
}

function createSingup(req: Request): IbaseInterface {
    return {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    };
}

export const Update = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id: string = req.params.id;
        const data = createDataFromRequest(req);
        
        const respondata = await collectionInstance.update(id, data as Ibasethiscollection);

        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        };

        const dataObjects = respondata.toJSON();
        dataObjects.edittime = moment(dataObjects.edittime).format('DD/MM/YYYY HH:mm');
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

export const singup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = createSingup(req);
        const checkUser = await collectionInstance.getUser(req.body.username, req.body.email);
        console.log('@@@', checkUser);

        if (!checkUser.usernameExists && !checkUser.emailExists) {
            const respondata = await collectionInstance.add(data as Ibasethiscollection);

            if (!respondata) {
                console.error('Không thể tạo mới');
                return res.status(500).json({ error: 'Không thể tạo mới' });
            }
            const dataObjects = respondata.toJSON();
            return res.json(dataObjects);
        } else {

            const errors: { username?: string, email?: string } = { username: '', email: '' };

            if (checkUser.usernameExists) {
                errors.username = 'Tên người dùng đã tồn tại';
            }
            else{
                errors.username = '';
            };

            if (checkUser.emailExists) {
                errors.email = 'Email đã được sử dụng';
            }
            else{
                errors.email = '';
            };
            
            return res.status(409).json(errors);
        }
    } catch (err) {
        console.error('Không thể tạo mới', err);
        return res.status(500).json({ error: 'Không thể tạo mới' });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = createSingup(req);
        const checkUser = await collectionInstance.getLogin(req.body.email, req.body.password);
        console.log('@@@', checkUser);

        if (checkUser.emailExists && checkUser.passwordMatches) {
            return res.json(checkUser);
        } else {

            const errors: { email?: string, password?: string } = { email: '', password: '' };

            if (!checkUser.emailExists) {
                errors.email = 'Email chưa đúng';
            }
            else{
                errors.email = '';
            };

            if (!checkUser.passwordMatches) {
                errors.password = 'Sai mật khẩu';
            }
            else{
                errors.password = '';
            };
            
            return res.status(409).json(errors);
        }
    } catch (err) {
        console.error('Không thể login', err);
        return res.status(500).json({ error: 'Không thể login' });
    }
};