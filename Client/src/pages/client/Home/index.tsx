import React, { Dispatch, useEffect, useState } from 'react';
import Header from "../../../components/client/Header";
import { Carousel, } from 'antd';
import { Link } from 'react-router-dom';
import Footer from '../../../components/client/Footer';
import ProductCard from '../../../components/client/productCard';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAllProduct } from '../../../redux/Reducer/ProductSlice';
import { useDispatch } from 'react-redux';
const homePage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const products = useAppSelector((state) => state.product.products);
    console.log("data:", products);

    useEffect(() => {
        void dispatch(getAllProduct())
    }, [dispatch]);
    const newProducts = products.slice(0, 5);
    return <>
        <Header />
        <div className="w-[1170px] mx-auto">
            <Carousel dotPosition={'bottom'} autoplay>
                <div>
                    <img src="https://i.pinimg.com/564x/79/2b/f7/792bf768d8a9e6b9c2045537c3f7dff8.jpg" alt=""
                        className=''
                    />
                </div>
                <div>
                    <img src="https://i.pinimg.com/564x/94/5a/56/945a5621e6c7289f01024893e5539ed3.jpg" alt=""
                        className=''
                    />
                </div>
            </Carousel>

            <div className="mb-10">
                <h3 className='uppercase border-l-4 border-b-2 p-3 my-3 border-primary '>
                    Sản phẩm mới nhất
                </h3>
                <div className="grid grid-cols-5 gap-4 my-5 px-3">
                    {newProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id || ''}
                            name={product.name}
                            price={product.price}
                            discount={product.discount}
                            image={product.images[0]}
                        />
                    ))}

                </div>
                <div className="italic text-center text-primary hover:text-sky-500 underline">
                    <Link to={`/products`}>Xem thêm..</Link>
                </div>
            </div>
        </div >
        <Footer />
    </>
}
export default homePage;