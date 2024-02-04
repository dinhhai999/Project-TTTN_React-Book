import express from "express";
import { get, getAll } from "../controllers/orderDeatil";
const router = express.Router()

router
    .get('/', getAll)
    .get('/:id', get)

export default router