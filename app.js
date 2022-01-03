process.env.TZ = 'Asia/Calcutta';

import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './server/routes/index';
import dbConnect from './server/helper/mongodb';
import http from 'http';
import cors from 'cors';

const logger = require('morgan');

const app = express();

dbConnect();


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/v1', indexRouter);

const httpServer = http.createServer(app);

httpServer.listen(8080, () => {
    console.log('HTTP Server running on port 8080');
});

export default app;
