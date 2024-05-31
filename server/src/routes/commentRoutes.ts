import express from 'express';
import { getData, Update, add, Delete, getAllCommentsFromArticle} from '../controllers/comment';

const commentRouter = express.Router();

commentRouter.get('/api/cnn/comments', getData);
commentRouter.put('/api/cnn/comments/edit/:id', Update);
commentRouter.post('/api/cnn/comments/post/:art', add);

// commentRouter.delete('/api/cnn/comments/delete/:id', Delete);

commentRouter.delete('/api/cnn/cmt/articles/delete/:id/:cmtOnArt/:Art', Delete);

commentRouter.get('/api/cnn/comments/onArt/:artid', getAllCommentsFromArticle);

export default commentRouter;
