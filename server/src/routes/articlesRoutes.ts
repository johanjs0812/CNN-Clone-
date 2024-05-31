import express from 'express';
import { getData, getArticlesByCategoryId, getDataId, Update, add, Delete} from '../controllers/articles';

const articlesRouter = express.Router();

articlesRouter.get('/api/cnn/articles', getData);

articlesRouter.get('/api/cnn/listnews/:id', getArticlesByCategoryId);

articlesRouter.get('/api/cnn/pots/:id', getDataId);

articlesRouter.put('/api/cnn/articles/edit/:id', Update);

articlesRouter.post('/api/cnn/articles/post/', add);

articlesRouter.delete('/api/cnn/articles/delete/:id', Delete);

export default articlesRouter;
