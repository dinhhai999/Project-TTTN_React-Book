import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAllProduct } from '../../../redux/Reducer/ProductSlice';
import Header from '../../../components/client/Header';
import Footer from '../../../components/client/Footer';
import ProductCard from '../../../components/client/productCard';
import { Link } from 'react-router-dom';
const ProductsPage = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);
    return (
        <>
            <Header />
            <div className="mb-10 w-[1170px] mx-auto py-5">
                <div className="grid grid-cols-5 gap-4 my-5 px-3">
                    {products.map((product) => (
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
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductsPage;
