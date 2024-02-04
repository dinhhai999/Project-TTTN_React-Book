import express from 'express';
import { adduser, deleteuser, getuser, getusers, updateuser } from '../controllers/user';

const routerUser = express.Router();
routerUser
    .post('/', adduser)
    .get('/', getusers)
    .get('/:id', getuser)
    .patch('/:id',updateuser)
    .delete('/:id', deleteuser)
export default routerUser;