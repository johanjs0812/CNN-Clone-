import express from 'express';
import { getData, Update, add, Delete, getDataId, singup, login} from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/api/cnn/users', getData);
userRouter.put('/api/cnn/users/edit/:id', Update);
userRouter.post('/api/cnn/users/post/', add);
userRouter.delete('/api/cnn/users/delete/:id', Delete);

userRouter.get('/api/cnn/users/:id', getDataId);
userRouter.post('/api/cnn/users/singup', singup);

userRouter.post('/api/cnn/users/login', login);

export default userRouter;
