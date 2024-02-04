import { useEffect, useState } from "react";
import Footer from "../../../components/client/Footer";
import Header from "../../../components/client/Header";
import {
    PlusOutlined,
    MinusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllCart, getCart, removeCart, updateCartQuantityAsync } from "../../../redux/Reducer/CartSlice";
import { message } from "antd";

const cart = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllCart());
    }, [dispatch]);

    const user = useAppSelector((state: any) => state.auth.auth);
    const cartData = useAppSelector((state) => state.Cart.carts);
    const carts = cartData.filter((cart) => cart.userId === user.user._id);
    let totalMoney: number = 0;
    carts?.map(item => {
        totalMoney += item.totalMoney
    })

    const confirm = async (id: string) => {
        console.log(id);

        await dispatch(removeCart(id));
    }

    const handleQuantityChange = async (productId: string, newQuantity: number, updatedTotalMoney: number) => {
        try {
            await dispatch(updateCartQuantityAsync({ productId, quantity: newQuantity, totalMoney: updatedTotalMoney }));
            const updatedCarts = carts.map((item) =>
                item._id === productId ? { ...item, quantity: newQuantity, totalMoney: updatedTotalMoney } : item
            );
            dispatch(getCart(updatedCarts));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };
    return <>
        <Header />
        <div className="w-[1170px] mx-auto">
            <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-10 bg-gray-50 border">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className="flex border-b pb-8">
                            <h1 className="font-semibold text-2xl mr-2">Giỏ hàng</h1>
                            <h2 className="font-semibold text-2xl">({carts.length} sản phẩm)</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/6"></h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 ">Số lượng</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 ">Thành tiền</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 "></h3>
                        </div>
                        {carts.map((item: any) => (
                            <div className="flex items-center -mx-8 px-6 py-5">
                                <div className="flex w-3/6">
                                    <div className="flex h-20 w-20 items-center justify-center">
                                        <img src={item.image} alt=""
                                            className="h-full  object-cover"
                                        />
                                    </div>
                                    <div className="space-y-2 py-1 px-3 w-3/5">
                                        <span className="block text-sm  text-[#333333] font-sans font-roboto overflow-hidden overflow-ellipsis h-[2.5rem] mb-1">
                                            <span style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
                                                {item.nameProduct}
                                            </span>
                                        </span>
                                        <div className="">
                                            <span className="text-sm text-primary  mr-2 ">
                                                {item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center w-1/6">
                                    <div className="flex items-center">
                                        <div className="flex w-[100px] items-center border border-gray-200 rounded justify-between px-3">
                                            <button
                                                type="button"
                                                className="w-3 h-8 text-gray-600 transition hover:opacity-75"
                                                onClick={() => handleQuantityChange(item._id, item?.quantity - 1, (item?.quantity - 1) * item?.price)}
                                            >
                                                <MinusOutlined className="text-xs" />
                                            </button>
                                            <input
                                                value={item.quantity}
                                                className="h-8 w-12 border-transparent text-center sm:text-sm"
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                className="w-3 h-8 text-gray-600 transition hover:opacity-75"
                                                onClick={() => handleQuantityChange(item._id, item?.quantity + 1, (item?.quantity + 1) * item?.price)}
                                            >
                                                <PlusOutlined className="text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-center w-1/6 font-semibold text-sm">{item?.totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                <span className="text-center w-1/6 font-semibold text-sm ">
                                    <button onClick={() => confirm(item._id)}>
                                        <DeleteOutlined />
                                    </button>
                                </span>
                            </div>
                        ))}



                        <Link to={`/`} className="flex font-semibold text-primary text-sm mt-10">

                            <svg className="fill-current mr-2 text-primary w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Tiếp tục mua hàng
                        </Link>
                    </div>

                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Tỏng sản phẩm</span>
                            <span className="font-semibold text-sm">{totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className="py-10">
                            <label className="font-semibold inline-block mb-3 text-sm uppercase">Mã giảm giá</label>
                            <input type="text" className="p-2 text-sm w-full border outline-none" />
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Áp dụng</button>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Tổng</span>
                                <span>{totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                            <Link to={`/checkout`}>
                                <button className="bg-primary font-semibold hover:bg-sky-500 py-3 text-sm text-white uppercase w-full">Thanh toán</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer />
    </>
}
export default cart;