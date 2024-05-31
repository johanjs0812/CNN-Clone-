"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_1 = require("../controllers/categories");
const cateRouter = express_1.default.Router();
cateRouter.get('/api/cnn/category', categories_1.getData);
cateRouter.post('/api/cnn/category/post', categories_1.add);
cateRouter.get('/api/cnn/category/:id', categories_1.getDataId);
cateRouter.put('/api/cnn/category/put/:id', categories_1.Update);
cateRouter.put('/api/cnn/category/subcategory/put/:parentId/:subcategoryId', categories_1.UpdateSubcategory);
cateRouter.patch('/api/cnn/category/subcategory/add/:parentId/', categories_1.AddSubcategory);
cateRouter.patch('/api/cnn/category/subcategory/delete/:parentId/:subcategoryId', categories_1.DeleteSubcategory);
cateRouter.delete('/api/cnn/category/del/:id', categories_1.Delete);
exports.default = cateRouter;
