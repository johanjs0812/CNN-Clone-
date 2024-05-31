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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.singup = exports.Delete = exports.getDataId = exports.getData = exports.add = exports.Update = void 0;
const user_1 = require("../models/user");
const moment_1 = __importDefault(require("moment"));
const collectionInstance = new user_1.Users();
function createDataFromRequest(req) {
    return {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
}
function createSingup(req) {
    return {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    };
}
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = createDataFromRequest(req);
        const respondata = yield collectionInstance.update(id, data);
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        }
        ;
        const dataObjects = respondata.toJSON();
        dataObjects.edittime = (0, moment_1.default)(dataObjects.edittime).format('DD/MM/YYYY HH:mm');
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
        console.error('Không thể tạo mới cate', err);
        res.status(500).json({ error: 'Không thể tạo mới cate' });
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
const singup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = createSingup(req);
        const checkUser = yield collectionInstance.getUser(req.body.username, req.body.email);
        console.log('@@@', checkUser);
        if (!checkUser.usernameExists && !checkUser.emailExists) {
            const respondata = yield collectionInstance.add(data);
            if (!respondata) {
                console.error('Không thể tạo mới');
                return res.status(500).json({ error: 'Không thể tạo mới' });
            }
            const dataObjects = respondata.toJSON();
            return res.json(dataObjects);
        }
        else {
            const errors = { username: '', email: '' };
            if (checkUser.usernameExists) {
                errors.username = 'Tên người dùng đã tồn tại';
            }
            else {
                errors.username = '';
            }
            ;
            if (checkUser.emailExists) {
                errors.email = 'Email đã được sử dụng';
            }
            else {
                errors.email = '';
            }
            ;
            return res.status(409).json(errors);
        }
    }
    catch (err) {
        console.error('Không thể tạo mới', err);
        return res.status(500).json({ error: 'Không thể tạo mới' });
    }
});
exports.singup = singup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = createSingup(req);
        const checkUser = yield collectionInstance.getLogin(req.body.email, req.body.password);
        console.log('@@@', checkUser);
        if (checkUser.emailExists && checkUser.passwordMatches) {
            return res.json(checkUser);
        }
        else {
            const errors = { email: '', password: '' };
            if (!checkUser.emailExists) {
                errors.email = 'Email chưa đúng';
            }
            else {
                errors.email = '';
            }
            ;
            if (!checkUser.passwordMatches) {
                errors.password = 'Sai mật khẩu';
            }
            else {
                errors.password = '';
            }
            ;
            return res.status(409).json(errors);
        }
    }
    catch (err) {
        console.error('Không thể login', err);
        return res.status(500).json({ error: 'Không thể login' });
    }
});
exports.login = login;
