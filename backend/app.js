import express from 'express';
import {nanoid} from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/mongodb.config.js';
import shortUrlSchema from './src/models/shorturl.model.js';
import short_url_router from './src/routes/short_url.route.js';
dotenv.config("./.env");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/create', short_url_router);

app.get('/:id', async (req, res) => {
  const shortUrl = await shortUrlSchema.findOne({ short_url: req.params.id });
  if (shortUrl) 
     res.redirect(shortUrl.full_url);
  else
    res.status(404).send('URL not found');
  });

app.listen(3000,() => {
  connectDB();
  console.log('Server is running on http://localhost:3000');
});
