"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const userRouter = express_1.default.Router();
userRouter.get('/api/cnn/users', user_1.getData);
userRouter.put('/api/cnn/users/edit/:id', user_1.Update);
userRouter.post('/api/cnn/users/post/', user_1.add);
userRouter.delete('/api/cnn/users/delete/:id', user_1.Delete);
userRouter.get('/api/cnn/users/:id', user_1.getDataId);
userRouter.post('/api/cnn/users/singup', user_1.singup);
userRouter.post('/api/cnn/users/login', user_1.login);
exports.default = userRouter;
