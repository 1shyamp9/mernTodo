import express from 'express';
import { Items, cteateItem, deleteItem, updateItem } from '../controllers/itemController.js';
import { isAuth } from '../middleware/auth.js';

export const  itemRoute = express.Router();

itemRoute.post('/newitem',isAuth ,cteateItem);
itemRoute.get('/items',isAuth ,Items);
itemRoute.put('/:id',isAuth , updateItem);
itemRoute.delete('/:id',isAuth , deleteItem);