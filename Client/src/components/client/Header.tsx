import { Link, useNavigate } from "react-router-dom";
import React, { Dispatch, useEffect, useState } from "react";
import {
    SearchOutlined,
    UserOutlined,
    ShoppingOutlined,
    HeartOutlined,
    LoginOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { Badge, Button, Drawer, Dropdown, Form, Menu, MenuProps, Popover, Space, message } from "antd";
import { AnyIfEmpty, useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../redux/Reducer/authSlice";
import { useAppSelector } from "../../redux/hook";
import { getAllCart, removeCart } from "../../redux/Reducer/CartSlice";
import ICart from "../../interface/cart";
import { getAllCategory } from "../../redux/Reducer/CategorySlice";
const Header = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const user = useAppSelector((state: any) => state.auth.auth);
    const cartData = useAppSelector((state) => state.Cart.carts);
    const category = useAppSelector((state) => state.category.categories);
    const carts = cartData.filter((cart: ICart) => cart.userId === user?.user?._id);
    const [selectedCategory, setSelectedCategory] = useState(null);
    let totalMoney: number = 0;
    carts?.map((item: any) => {
        totalMoney += item.totalMoney
    })
    // category usereffect
    useEffect(() => {
        dispatch(getAllCategory()); // Dispatch the action to get categories on component mount
    }, [dispatch]);
    // useEffect products
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllCart())
    }, [dispatch]);
    const showDrawer = () => {
        if (carts?.length === 0) {
            message.info("Không có sản phẩm nào trong giở hàng")
        } else {
            setOpen(true);
        }
    };
    const onClose = () => {
        setOpen(false);
    };
    const logOut = () => {
        dispatch(authLogout());
        message.success("Bạn đã đăng xuất!");
        navigate("/signin");
    };
    const acount = user ? (
        <div className="">
            <h1 className="uppercase text-center pb-2 mb-2 border-b-[1px] text-base tracking-widest text-[#333333]">
                Thông tin tài khoản
            </h1>
            <ul className="ml-5 text-sm ">
                <span className="block text-base list-disc font-light mb-1">
                    <span>Xin chào, </span>
                    <span className="font-medium">
                        {user.user.fullname}
                    </span>
                </span>
                <li className="list-disc font-light mb-1">
                    <Link to="/account">Tài khoản của tôi</Link>
                </li>
                <li className="list-disc font-light mb-1">
                    <Link to="/account/order">Đơn hàng của tôi</Link>
                </li>
                <li className="list-disc font-light mb-1">
                    <button onClick={() => logOut()}>
                        Đăng xuất
                    </button>
                </li>
            </ul>
        </div>
    ) : (
        <Link to="/signin"><LoginOutlined className="mr-2" />Đăng nhập</Link>
    );
    const items: MenuProps['items'] = [
        {
            label: "Sách thiếu nhi",
            key: '1',
            className: "h-10",
        },
    ];
    return (
        <div className="">
            <div className="flex w-[1170px] mx-auto items-center justify-between">
                <div className="">
                    <Link to={`/`}>
                        <img src="../../public/image/boos.png" alt="logo"
                            className="w-28 h-28"
                        />
                    </Link>
                </div>
                <form className="flex">
                    <input type="text" className='border p-2 w-[400px] outline-none text-[#333333]'
                        placeholder="Bạn cần tìm gì?" />
                    <button type="submit" className='w-10 bg-primary p-2 text-center flex items-center justify-center'>
                        <SearchOutlined className='text-white' />
                    </button>
                </form>
                <div className="">
                    {user ? (
                        <div className="">
                            {/* <HeartOutlined className="mr-4 text-2xl" /> */}
                            <Badge count={carts.length} className="mr-4" >
                                <ShoppingOutlined className="text-2xl text-[#333333]" onClick={showDrawer} />
                            </Badge>
                            <Popover content={acount} trigger="click" >
                                <UserOutlined className="text-2xl text-[#333333]" />
                            </Popover>
                        </div>
                    ) : (
                        <div className="">
                            <Link to={`/signin`} className="px-2 border-r-[1px] ">Đăng nhập</Link>
                            <Link to={`/signup`} className="px-2">Đăng kí</Link>
                        </div>
                    )}

                    <Drawer title={`GIỎ HÀNG (${carts.length})`} placement="right" onClose={onClose} open={open}>
                        <div className="pb-2 mb-2 border-b-[1px] text-[#333333]">
                            {carts.map((cart: ICart) => (
                                <div className="flex justify-between mb-3">
                                    <div className="flex w-4/5">
                                        <div className="flex h-20 w-20 items-center justify-center">
                                            <img src={cart.image} alt=""
                                                className="h-full w-auto object-cover"
                                            />
                                        </div>
                                        <div className="w-3/5">
                                            <span className="block text-sm font-medium text-[#333333] font-sans font-roboto overflow-hidden overflow-ellipsis h-[2.5rem] mb-1">
                                                <span style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
                                                    {cart.nameProduct}
                                                </span>
                                            </span>
                                            <span className="block text-sm"> {cart?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        </div>
                                    </div>
                                    <span className="block text-sm w-1/5">SL: {cart.quantity}</span>
                                </div>
                            ))}


                        </div>
                        <div className="flex justify-between ">
                            <Link to={`/cart`}
                                className="text-primary italic underline"
                            >
                                Cập nhật giỏ hàng
                            </Link>
                            <Link to={`/cart`}
                                className="text-primary italic underline"
                            >
                                <Button type="primary" className="bg-primary">Xem giỏ hàng</Button>
                            </Link>
                        </div>
                    </Drawer>
                </div>
            </div >
            <div className="bg-primary h-12 ">
                <div className="w-[1170px] mx-auto flex items-center justify-between">
                    <Dropdown
                        overlay={
                            <Menu>
                                {category.map((category) => (
                                    <Menu.Item key={category._id} className="h-10">
                                        {category.name}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        }
                        trigger={['click']}
                        className="w-[300px] bg-blue-400 px-3"
                    >
                        <span onClick={(e) => e.preventDefault()} className="leading-12 h-12 text-white flex items-center">
                            <MenuOutlined className="text-xl mr-3" /> DANH MỤC SẢN PHẨM
                        </span>
                    </Dropdown>
                </div>

            </div>
        </div >
    );
};
export default Header;
