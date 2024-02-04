import React, { Dispatch, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../../redux/Reducer/authSlice';
import Header from '../../../components/client/Header';
import Footer from '../../../components/client/Footer';
import { getAllOrder } from '../../../redux/Reducer/OrderSlice';
import { useAppSelector } from '../../../redux/hook';

interface DataType {
    _id: string;
    date: string;
    paymentStatus: number;
    totalMoney: number;
    status: string;
}

const OrderPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);

    const user = useAppSelector((state: any) => state.auth.auth);
    const ordersData = useAppSelector((state) => state.Order.orders);
    const orders = ordersData.filter((order: any) => order.userId === user.user._id);
    console.log(orders);


    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <Link to={`/account/order/${text}`}
                className='uppercase'
            >
                #{text.slice(0, 10)}...
            </Link>,
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Trạng thái thanh toán',
            render: (value: any) => (
                (value.paymentStatus === 1 ? 'Đã thanh toán' : 'Chưa thanh toán')
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'status',
            render: (value: number) => {
                switch (value) {
                    case 0:
                        return 'Hủy';
                    case 1:
                        return 'Đang xử lý';
                    case 2:
                        return 'Đang chuẩn bị hàng';
                    case 3:
                        return 'Đang giao';
                    case 4:
                        return 'Hoàn thành';
                    default:
                        return 'Trạng thái không xác định';
                }
            }
        },

    ];

    const logOut = async () => {
        dispatch(authLogout());
        navigate("/");
        await message.success("Bạn đã đăng xuất");
    };
    const data: DataType[] = orders.map((order: any) => {
        const orderDate = new Date(order.createdAt);

        const day = orderDate.getDate();
        const month = orderDate.getMonth() + 1;
        const year = orderDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return {
            _id: order._id,
            totalMoney: order.totalMoney,
            date: formattedDate,
            paymentStatus: order.paymentStatus,
            status: order.status,
        };
    });
    return (

        <div>
            <Header />
            <div className="mx-14 mt-10 mb-16">
                <h1 className='uppercase font-normal text-[20px] text-center mb-10 relative p-3'>
                    <span>Đơn hàng của tôi</span>
                    <span className='block w-20 h-1 bg-black absolute left-1/2 transform -translate-x-1/2 bottom-0'></span>
                </h1>
                <div className="row flex">
                    <div className="w-2/5">
                        <h3 className='uppercase font-medium text-[17px] mb-3'>
                            Tài khoản
                        </h3>
                        <ul className="text-sm">
                            <li className="font-light mb-3 hover:text-[#1677ff]">
                                <Link to="/account">Tài khoản của tôi</Link>
                            </li>
                            <li className="font-light mb-3 hover:text-[#1677ff]">
                                <Link to="/account/order">Đơn hàng của tôi</Link>
                            </li>
                            <li className="font-light mb-3 hover:text-[#1677ff]">
                                <Link to="/account/address">Danh sách địa chỉ</Link>
                            </li>
                            <li className="list-inside font-light mb-3 hover:text-[#1677ff]">
                                <button onClick={() => logOut()}>
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full">
                        <h3 className='uppercase font-medium text-[17px] mb-3'>
                            danh sách đơn hàng
                        </h3>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderPage;