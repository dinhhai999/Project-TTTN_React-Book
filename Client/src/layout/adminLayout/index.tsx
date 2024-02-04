import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
type Props = { children: React.ReactNode };

import {
    PieChartOutlined,
    CodeSandboxOutlined,
    AppstoreAddOutlined,
    LogoutOutlined,
    TagOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Popconfirm, Space, message, theme } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { authLogout } from '../../redux/Reducer/authSlice';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const AdminLayout = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem(<Link to={"/admin/dashboard"}>Dashboard</Link >, '1', <PieChartOutlined />),
        getItem('Products', 'sub1', <CodeSandboxOutlined />, [
            getItem(<Link to={"/admin/product/add"}>Create New</Link >, '3'),
            getItem(<Link to={"/admin/product"}>View List</Link >, '4'),
        ]),
        getItem('Categorys', 'sub2', <AppstoreAddOutlined />, [
            getItem(<Link to={"/admin/category/add"}>Create New</Link >, '5'),
            getItem(<Link to={"/admin/category"}>View List</Link >, '6'),
        ]),
        getItem(<Link to={"/admin/order"}>Order</Link >, '7', <TagOutlined />),
        getItem(<Link to={"/admin/user"}>Uers</Link >, '8', <UserOutlined />),
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { auth } = useAppSelector((state) => state.auth);

    const logOut = () => {
        dispatch(authLogout());
        navigate("/");
        message.success("Logout successfully!");
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="flex justify-center">
                    <img src="" alt=""
                        className=' w-24 '
                    />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
                <div className="fixed bottom-0">
                    <button className="text-gray-300 bg-gray-800 w-[200px] py-3 hover:text-white" onClick={() => logOut()}>
                        <LogoutOutlined className="mr-2" />
                        Logout
                    </button>
                </div>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
                <Content className=''>

                    <div className='bg-slate-50' style={{ padding: 24, minHeight: 360 }}>
                        {auth?.user.role === "admin"
                            ? children
                            : (message.error("Bạn không có quyền!"),
                                (<Navigate to="/signin" replace />))}
                        {/* {children} */}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
            </Layout>
        </Layout>
    );
};

export default AdminLayout;