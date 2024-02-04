import React from 'react';
import { Link } from 'react-router-dom';
interface dataType {
    id: string;
    name: string;
    price: number;
    discount: number;
    image: string;
}
const ProductCard = (product: dataType) => {
    return (
        <Link to={`/products/${product.id}`}>
            <div className="border border-gray-100 w-[200px] py-3 p-2 relative">
                <span className={`absolute rounded-full bg-red-500 text-white w-8 h-8 text-xs font-semibold text-center flex items-center justify-center right-1 top-1 ${product.discount === 0 ? 'hidden' : ''}`}>
                    {Math.ceil(((product.price - product.discount) / product.price) * 100)}%
                </span>
                <div className=" flex justify-center items-center">
                    <img
                        src={product.image}
                        alt=""
                        className=" h-[180px]"
                    />
                </div>
                <div className="">
                    <span className="block text-sm text-[#333333] font-sans font-roboto overflow-hidden overflow-ellipsis h-[2.5rem] mb-1">
                        <span style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
                            {product.name}
                        </span>
                    </span>

                    {product.discount === 0 ? (
                        <span className="text-base font-medium text-primary mr-2">
                            {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                    ) : (
                        <span className="text-base font-medium text-primary mr-2">
                            {product.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                    )}
                    <span className={`text-sm text-gray-500 line-through ${product.discount === 0 ? 'hidden' : ''}`}>
                        {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
