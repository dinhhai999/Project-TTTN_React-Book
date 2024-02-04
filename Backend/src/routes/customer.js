import express from 'express';
import { addcustomer, deletecustomer, getcustomer, getcustomers, updatecustomer } from '../controllers/customer';

const routerCustomer = express.Router();
routerCustomer
    .post('/', addcustomer)
    .get('/', getcustomers)
    .get('/:id', getcustomer)
    .patch('/:id',updatecustomer)
    .delete('/:id', deletecustomer)
export default routerCustomer;