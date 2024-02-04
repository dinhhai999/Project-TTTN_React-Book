import { useEffect, useState } from "react";
import Footer from "../../../components/client/Footer";
import Header from "../../../components/client/Header";
import {
    PlusOutlined,
    MinusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllCart } from "../../../redux/Reducer/CartSlice";
import IOrder from "../../../interface/order";
import { createOrder } from "../../../redux/Reducer/OrderSlice";
import IOrderDetail from "../../../interface/orderDeatil";

const checkoutPage = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllCart());
    }, [dispatch]);

    const user = useAppSelector((state: any) => state.auth.auth);

    const cartData = useAppSelector((state) => state.Cart.carts);
    const carts = cartData.filter((cart) => cart.userId === user.user._id);
    console.log("cartData", carts);

    let totalMoney: number = 0;
    carts?.map(item => {
        totalMoney += item.totalMoney
    })
    let newCart: IOrderDetail[] = []

    carts?.map(item => {
        newCart.push({ productId: item.productId, price: item.price, quantity: item.quantity, totalMoney: item.totalMoney, image: item.image, nameProduct: item.nameProduct })
    })
    useEffect(() => {
        dispatch(getAllCart())
    }, [dispatch]);

    const confirm = async (value: IOrder) => {
        try {

            const values = {
                userId: user.user._id,
                ...value,
                carts: newCart,
                totalMoney: totalMoney
            };
            console.log("value:", values);
            // dispatch(createOrder(values));
            const response = await dispatch(createOrder(values));
            message.success("Thanh toán thành công");
            if (createOrder.fulfilled.match(response)) {
                const orderId = response.payload._id;
                console.log(orderId);

                setTimeout(() => {
                    navigate(`/invoice/${orderId}`);
                }, 2500);
            }

            // navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    };
    return <>
        <Header />
        <div className="w-[1170px] mx-auto">
            <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-10 bg-white border">
                    <div className="w-1/2 px-8 py-10">
                        <Form
                            form={form}
                            onFinish={confirm}
                            layout="vertical"
                        >
                            <h1
                                className="text-2xl font-medium pb-3 mb-3 border-b"
                            >Thông tin người nhân</h1>
                            <Form.Item
                                label="Họ và tên"
                                name="fullName"
                                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                            >
                                <Input className="py-2" />
                            </Form.Item>
                            <Form.Item
                                label="Số điệ thoại"
                                name="phoneNumber"
                                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                            >
                                <Input className="py-2" />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: "Vui lòng nhập số địa chỉ" }]}
                            >
                                <Input className="py-2" />
                            </Form.Item>
                            <Form.Item
                                label="Ghi chú"
                                name="note"
                            >
                                <TextArea rows={3} />
                            </Form.Item>
                            <Form.Item name="pay_method" label="Phương thức thanh thoán">
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value="COD">Thanh toán tiền mặt khi nhận hàng</Radio>
                                        <Radio value="VNPAY">Ví Momo</Radio>
                                        <Radio value="MOMO">Ví VNPAY</Radio>
                                        <Radio value="ZALOPAY">Ví ZaloPay</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                className="flex justify-end"
                            >
                                <Button type="primary" htmlType="submit"
                                    className="bg-primary px-10"
                                >
                                    Thanh toán
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>


                    <div className="w-1/2 bg-gray-50 px-10 py-10">
                        <div className="flex border-b pb-8">
                            <h1 className="font-semibold text-2xl mr-2">Giỏ hàng</h1>
                            <h2 className="font-semibold text-2xl">({carts.length} sản phẩm)</h2>
                        </div>
                        {carts.map((item: any) => (
                            <div className="flex items-center -mx-8 px-6 py-5 border-b mb-1">
                                <div className="flex w-4/5">
                                    <div className="max-w-[80px]">
                                        <img className="" src={item.image} alt="" />
                                    </div>
                                    <div className="space-y-1 pr-1">
                                        <span className="text-sm line-clamp-1">{item.nameProduct}</span>
                                        <div className="">
                                            <span className="text-sm text-primary  mr-2 ">
                                                {item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </span>
                                            {/* <span className="text-xs text-gray-500 line-through mr-2 ">300,000đ</span> */}
                                        </div>
                                        <span className="text-sm">SL: 1</span>
                                    </div>
                                </div>
                                <span className="text-center w-1/5 font-semibold text-sm">
                                    {item?.totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                            </div>
                        ))}
                        <div className="py-3 font-medium text-sm flex justify-between">
                            <div className="space-y-3 ">
                                <span className="block">Tổng sản phẩm</span>
                                <span className="block">Giao hàng tận nơi</span>
                                <span className="block">Tổng</span>
                            </div>
                            <div className="space-y-3 ">
                                <span className="block">
                                    {totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                                <span className="block text-primary">Miễn phí</span>
                                <span className="block">
                                    {totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                            </div>
                        </div>


                        <Link to={`/`} className="flex font-semibold text-primary text-sm mt-10">

                            <svg className="fill-current mr-2 text-primary w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Tiếp tục mua hàng
                        </Link>
                    </div>



                </div>
            </div>
        </div>
        <Footer />
    </>
}
export default checkoutPage;