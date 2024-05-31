import express from 'express';
import { getData, getDataId, add, Update, Delete, UpdateSubcategory, AddSubcategory, DeleteSubcategory} from '../controllers/categories';

const cateRouter = express.Router();

cateRouter.get('/api/cnn/category', getData);
cateRouter.post('/api/cnn/category/post', add);
cateRouter.get('/api/cnn/category/:id', getDataId);
cateRouter.put('/api/cnn/category/put/:id', Update);
cateRouter.put('/api/cnn/category/subcategory/put/:parentId/:subcategoryId', UpdateSubcategory);
cateRouter.patch('/api/cnn/category/subcategory/add/:parentId/', AddSubcategory);
cateRouter.patch('/api/cnn/category/subcategory/delete/:parentId/:subcategoryId', DeleteSubcategory);
cateRouter.delete('/api/cnn/category/del/:id', Delete);

export default cateRouter;
