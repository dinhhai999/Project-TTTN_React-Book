import IOrderDetail from "./orderDeatil";

interface IOrder {
    createdAt: any;
    _id?: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    note: string;
    status: number;
    paymentStatus: number;
    // vourcher_code?: string;
    pay_method: number;
    totalMoney: number;
    orderDetails: IOrderDetail[]
}

export default IOrder;