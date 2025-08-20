import express from 'express';
import { create_short_url } from '../controller/short_url.controller.js';
const router = express.Router()


router.post("/",create_short_url)
export default router;