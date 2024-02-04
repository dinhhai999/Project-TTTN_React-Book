import express from 'express';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product';
// import { checkPermission } from '../middlewares/checkPermission';

const router = express.Router();

router
    .post('/' , addProduct )
    .get('/', getProducts)
    .get('/:id', getProduct)
    .patch('/:id', updateProduct)
    .delete('/:id', deleteProduct)

export default router;
