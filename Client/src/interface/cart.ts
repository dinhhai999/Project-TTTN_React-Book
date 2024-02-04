import IProduct from "./product";

interface ICart {
    _id?: string;
    productId: string;
    nameProduct: string;
    image: string;
    price: number;
    quantity: number;
    totalMoney: number;
    userId: string;
}

export default ICart;