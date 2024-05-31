import express, { Express } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer'; 
import cors from 'cors';
import cateRouter from './routes/categoryRoutes';
import articlesRouter from './routes/articlesRoutes';
import userRouter from './routes/userRoutes';
import commntRoutes from './routes/commentRoutes';

import {connectToDb} from './util/database';

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

connectToDb()
  .then(() => console.log('Database & tables created!'))
  .catch((err: Error) => console.log('Error: ' + err.message));

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cateRouter);
app.use(articlesRouter);
app.use(userRouter);
app.use(commntRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
