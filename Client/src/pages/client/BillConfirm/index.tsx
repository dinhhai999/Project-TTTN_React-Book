import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllOrder } from "../../../redux/Reducer/OrderSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import IOrder from "../../../interface/order";
import Header from "../../../components/client/Header";
import Footer from "../../../components/client/Footer";
import axios from "axios";

const BillCornfirm = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const orders = useAppSelector((state) => state.Order.orders);

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch]);
    console.log(id);

    const order = orders?.find((order: IOrder) => order._id === id);
    const listOrderDetails = order?.orderDetails

    const [orderDetailData, setOrderDetailData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const orderDetailPromises = (listOrderDetails || []).map(async (detailId) => {
                const response = await axios.get(`http://localhost:8080/api/orderDetails/${detailId}`);
                const data = response.data

                return data;
            });

            try {
                const data = await Promise.all(orderDetailPromises);
                setOrderDetailData(data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        fetchData();
    }, [listOrderDetails]);
    console.log("data:", orderDetailData);
    const date = () => {
        const date = new Date(order?.createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    return <>
        <Header />
        <Link to={`/`} className="flex font-semibold text-primary text-sm p-3">

            <svg className="fill-current mr-2 text-primary w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Tiếp tục mua hàng
        </Link>
        <div className="flex justify-center pt-5">
            <div className="w-[800px] rounded-lg shadow-md p-7 border">
                <div className="flex justify-between">
                    <div className="">
                        <span className="block text-2xl font-bold"></span>
                        <span className="block uppercase text-3xl font-bold">#{order?._id?.slice(0, 10)}</span>
                    </div>
                    <div className="text-end">
                        <div className="flex justify-end pb-3">
                            <img className="w-24 object-cover" src="../../public/image/logo.png" alt="" />
                        </div>
                        <span className="block font-semibold text-lg p-1">
                             BookStore
                        </span>
                        {/* <span className="block p-1">
                            86 Quảng Oai, Ba Vì, Hà Nội
                        </span>
                        <span className="block p-1">
                            0353540120
                        </span> */}
                        <span className="block p-1">
                            Ngày đặt: {date()}
                        </span>
                    </div>
                </div>
                <div className="">
                    <span className="block font-semibold text-lg">
                        Thông tin người nhận
                    </span>
                    <span className="block p-1">
                        {order?.fullName}
                    </span>
                    <span className="block p-1">
                        {order?.address}

                    </span>
                    <span className="block p-1">
                        {order?.phoneNumber}
                    </span>
                </div>

                <div className="relative overflow-x-auto mt-3">
                    {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Item
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex w-4/5 items-center">
                                        <div className="">
                                            <img className="w-14 object-cover rounded-full" src="https://htmldemo.net/shome/shome/assets/img/shop/1.webp" alt="" />
                                        </div>
                                        <div className="flex flex-col  ml-3 flex-grow">
                                            <span className="font-bold text-sm">
                                                Quickiin Mens shoes
                                            </span>
                                            <span className=" text-xs text-gray-400 mr-3">L, Red</span>
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    $8
                                </td>
                                <td className="px-6 py-4">
                                    2
                                </td>
                                <td className="px-6 py-4">
                                    $16
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex w-4/5 items-center">
                                        <div className="">
                                            <img className="w-14 object-cover rounded-full" src="https://htmldemo.net/shome/shome/assets/img/shop/1.webp" alt="" />
                                        </div>
                                        <div className="flex flex-col  ml-3 flex-grow">
                                            <span className="font-bold text-sm">
                                                Quickiin Mens shoes
                                            </span>
                                            <span className=" text-xs text-gray-400 mr-3">L, Red</span>
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    $8
                                </td>
                                <td className="px-6 py-4">
                                    2
                                </td>
                                <td className="px-6 py-4">
                                    $16
                                </td>
                            </tr>

                        </tbody>
                    </table> */}
                    <div className="w-full bg-white px-10 py-8">
                        <div className="flex pb-8">
                            <h1 className="font-semibold text-2xl mr-2">Tổng</h1>
                            <h2 className="font-semibold text-2xl">({orderDetailData.length} sản phẩm)</h2>
                        </div>
                        <div className="flex py-5 border-b ">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/5">Sản phẩm</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Số lượng</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Thành tiền</h3>
                        </div>
                        {orderDetailData.map((item: any) => (

                            <div className="flex items-center   py-5 border-b">
                                <div className="flex w-3/5">
                                    <div className="flex h-20 w-20 items-center justify-center">
                                        <img src={item.image} alt=""
                                            className="h-full object-cover"
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
                                <div className="flex justify-center w-1/5">
                                    <span className="text-sm">
                                        {item.quantity}
                                    </span>
                                </div>
                                <span className="text-center w-1/5 font-semibold text-sm">
                                    {item?.totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>

                            </div>
                        ))}


                    </div>


                </div>
                <div className="flex justify-end mt-5">
                    <div className="w-1/2">
                        <div className="flex justify-between py-1">
                            <span>Tổng sản phẩm</span>
                            <span>{order?.totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        {/* <div className="flex justify-between py-1">
                            <span>Phương thức thanh toán</span>
                            <span>{order?.pay_method}</span>
                        </div> */}
                        <div className="flex justify-between py-1">
                            <span>Giao hàng tận nơi</span>
                            <span>Miễn phí</span>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="font-bold">Tổng đơn hàng</span>
                            <span className="font-bold">{order?.totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <Footer />
    </>
}
export default BillCornfirm;