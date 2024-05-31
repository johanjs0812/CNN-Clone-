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
exports.Delete = exports.getDataId = exports.getData = exports.add = exports.Update = exports.DeleteSubcategory = exports.UpdateSubcategory = exports.AddSubcategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const catgories_1 = require("../models/catgories");
const moment_1 = __importDefault(require("moment"));
const collectionInstance = new catgories_1.Categories();
function createDataFromRequest(req) {
    if (!req.body.name || !req.body.slug) {
        return null;
    }
    const subcategories = req.body.subcategories
        ? req.body.subcategories.map((sub) => ({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: sub.name,
            slug: sub.slug,
        }))
        : [];
    const now = new Date();
    return {
        _id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name,
        slug: req.body.slug,
        subcategories: subcategories,
        createdAt: now,
        updatedAt: now,
    };
}
function editDataFromRequest(req) {
    if (!req.body.name || !req.body.slug) {
        console.log('kocogi');
        return null;
    }
    const now = new Date();
    const subcategories = req.body.subcategories
        ? req.body.subcategories.map((sub) => ({
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
    };
}
const AddSubcategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mainCategoryId = req.params.parentId;
        const now = new Date();
        const newData = {
            _id: new mongoose_1.default.Types.ObjectId,
            name: req.body.name,
            slug: req.body.slug,
            createdAt: now,
            updatedAt: now
        };
        console.log('updatedCategory', mainCategoryId, newData);
        const updatedCategory = yield collectionInstance.addSubcollection(mainCategoryId, newData);
        console.log(updatedCategory);
        if (!updatedCategory) {
            return res.status(404).json({ error: 'No category or subcategory found with the provided IDs' });
        }
        const dataObjects = updatedCategory.toJSON();
        res.status(200).json(dataObjects);
    }
    catch (err) {
        console.error('Failed to update subcategory', err);
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
});
exports.AddSubcategory = AddSubcategory;
const UpdateSubcategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mainCategoryId = req.params.parentId;
        const subcategoryIdToUpdate = req.params.subcategoryId;
        const now = new Date();
        const newData = {
            name: req.body.name,
            slug: req.body.slug,
            updatedAt: now
        };
        const updatedCategory = yield collectionInstance.updateSubcollection(mainCategoryId, subcategoryIdToUpdate, newData);
        if (!updatedCategory) {
            return res.status(404).json({ error: 'No category or subcategory found with the provided IDs' });
        }
        const dataObjects = updatedCategory.toJSON();
        res.status(200).json(dataObjects);
    }
    catch (err) {
        console.error('Failed to update subcategory', err);
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
});
exports.UpdateSubcategory = UpdateSubcategory;
const DeleteSubcategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mainCategoryId = req.params.parentId;
        const subcategoryIdToUpdate = req.params.subcategoryId;
        const updatedCategory = yield collectionInstance.deleteSubcollection(mainCategoryId, subcategoryIdToUpdate);
        if (!updatedCategory) {
            return res.status(404).json({ error: 'No category or subcategory found with the provided IDs' });
        }
        res.status(200).json(updatedCategory);
    }
    catch (err) {
        console.error('Failed to update subcategory', err);
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
});
exports.DeleteSubcategory = DeleteSubcategory;
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = editDataFromRequest(req);
        const respondata = yield collectionInstance.update(id, data);
        if (!respondata) {
            console.error('Failed to fetch Pots');
            return res.status(404).json({ error: 'Category not found' });
        }
        ;
        const dataObjects = respondata.toJSON();
        console.log('ctr', dataObjects);
        res.json(dataObjects);
    }
    catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
});
exports.Update = Update;
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('body', req.body);
    try {
        const data = createDataFromRequest(req);
        console.log('data', data);
        if (!data) {
            return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
        }
        const respondata = yield collectionInstance.add(data);
        console.log('res', respondata);
        if (!respondata) {
            console.error('Không thể tạo mới cate');
            return res.status(500).json({ error: 'Không thể tạo mới cate' });
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
        dataObjects.forEach(items => {
            items.createdAt = (0, moment_1.default)(items.createdAt).format('DD/MM/YYYY HH:mm');
            items.updatedAt = (0, moment_1.default)(items.updatedAt).format('DD/MM/YYYY HH:mm');
            for (const sub in items.subcategories) {
                const subcategory = items.subcategories[sub];
                subcategory.createdAt = (0, moment_1.default)(subcategory.createdAt).format('DD/MM/YYYY HH:mm');
                subcategory.updatedAt = (0, moment_1.default)(subcategory.updatedAt).format('DD/MM/YYYY HH:mm');
            }
        });
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
        dataObjects.createdAt = (0, moment_1.default)(dataObjects.createdAt).format('DD/MM/YYYY HH:mm');
        dataObjects.updatedAt = (0, moment_1.default)(dataObjects.updatedAt).format('DD/MM/YYYY HH:mm');
        for (const sub in dataObjects.subcategories) {
            const subcategory = dataObjects.subcategories[sub];
            subcategory.createdAt = (0, moment_1.default)(subcategory.createdAt).format('DD/MM/YYYY HH:mm');
            subcategory.updatedAt = (0, moment_1.default)(subcategory.updatedAt).format('DD/MM/YYYY HH:mm');
        }
        ;
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
        console.log('?', respondata);
        res.json(respondata);
    }
    catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch cate' });
    }
});
exports.Delete = Delete;
