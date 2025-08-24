import express from 'express';
import {nanoid} from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/mongodb.config.js';
import shortUrlSchema from './src/models/shorturl.model.js';
import short_url_router from './src/routes/short_url.route.js';
import { redirect_short_url } from './src/controller/short_url.controller.js';
dotenv.config("./.env");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/create', short_url_router);

app.get('/:id', redirect_short_url);

app.listen(3000,() => {
  connectDB();
  console.log('Server is running on http://localhost:3000');
});
