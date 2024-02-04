import { Breadcrumb, Button, Carousel, Form, InputNumber, message } from "antd";
import Footer from "../../../components/client/Footer";
import Header from "../../../components/client/Header";
import {
    HomeOutlined,
    PlusOutlined,
    MinusOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import ProductCard from "../../../components/client/productCard";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct, getProduct } from "../../../redux/Reducer/ProductSlice";
import IProduct from "../../../interface/product";
import ICart from "../../../interface/cart";
import { createCart } from "../../../redux/Reducer/CartSlice";
const productDetail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const products = useAppSelector((state) => state.product.products);
    // const categories = useAppSelector((state) => state.Category.categories);
    const { auth } = useAppSelector((state) => state.auth);
    console.log(auth);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
    }, [dispatch]);


    const { id } = useParams();
    const product = products?.find((product: IProduct) => product._id === id);


    const addToCart = async () => {
        if (!auth) {
            message.info("Bạn chưa đăng nhập");
            return;
        }
        try {
            if (product) {
                const data = {
                    productId: product._id || '',
                    nameProduct: product.name,
                    image: product.images[0],
                    quantity: quantity,
                    price: (product.discount > 0 ? product.discount : product.price),
                    totalMoney: (product.discount > 0 ? product.discount * quantity : product.price * quantity),
                    userId: auth.user._id
                };
                dispatch(createCart(data));
                message.success("Sản phẩm đã thêm vào giỏ hàng")
                // navigate(`/cart`)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const maxQuantity = product?.quantity

    const handleIncrement = () => {
        if (quantity < maxQuantity!) {
            setQuantity(quantity + 1);
        } else {
            message.warning('Số lượng vượt quá số lượng trong kho.');
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleImageClick = (index: any) => {
        setSelectedImage(index);
    };
    const cateProduct = products?.filter((newProduct: IProduct) => newProduct.categoryId?._id === product?.categoryId?._id);
    const listCateProduct = cateProduct.slice(0, 5);
    return <>
        <Header />
        <div className="w-[1170px] mx-auto">
            <div className="flex p-3 mb-20 mt-10">
                <div className="flex">
                    <div className="h-[300px] mr-10 ">
                        {product?.images.map((imageUrl, index) => (
                            <div key={index} onClick={() => handleImageClick(index)} className="h-20 w-20  overflow-hidden mb-3 relative group transform transition-transform hover:scale-110">
                                <div className="h-full w-full flex items-center justify-center">
                                    <img src={imageUrl} alt=""
                                        className="h-full w-auto object-cover"
                                    />
                                </div>
                                <div className="absolute rounded-md inset-0 border-2 border-transparent group-hover:border-primary"></div>
                            </div>
                        ))}
                    </div>
                    <div >
                        <div className="w-[300px] h-[450px]">
                            <img src={product?.images[selectedImage]} alt=""
                                className=" object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="pl-28 p-3">
                    <div className="">
                        <h1 className="font-medium text-3xl mb-3 text-[#333]">
                            {product?.name}
                        </h1>
                        <div className="mb-3">
                            <span className="mr-1 text-[#333]">
                                Tác giả:
                            </span>
                            <span className="text-lg font-medium text-[#333]">
                                {product?.author}
                            </span>
                        </div>
                        <div className="mb-6">
                            {product?.discount === 0 ? (
                                <span className="text-2xl font-medium text-primary mr-2">
                                    {product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                            ) : (
                                <span className="text-2xl font-medium text-primary mr-2">
                                    {product?.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                            )}

                            <span className={`text-base text-gray-500 line-through mr-2 ${product?.discount === 0 ? 'hidden' : ''}`}>
                                {product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                            <span className={`text-sm font-medium text-white bg-red-500 p-1 rounded-lg ${product?.discount === 0 ? 'hidden' : ''}`}>
                                {product ? Math.ceil(((product.price - product.discount) / product.price) * 100) : ""}%
                            </span>
                        </div>
                        <div className="mb-6">
                            <span className="mr-5 text-[#333]">
                                Tình trạng:
                            </span>
                            <span className="text-lg font-medium text-primary">
                                {product?.quantity === 0 ? "Hết hàng" : "Còn hàng"}
                            </span>
                        </div>
                        <div className="mb-6">
                            <Form
                                onFinish={addToCart}
                            >
                                <Form.Item
                                    name="quantity"
                                >
                                    <div className="flex items-center">
                                        <span className="mr-20 font-medium text-lg "> Số lượng: </span>
                                        <div className="flex w-[150px] items-center border border-gray-200 rounded justify-between px-2">
                                            <button
                                                type="button"
                                                className="w-5 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                onClick={handleDecrement}
                                            >
                                                <MinusOutlined />
                                            </button>

                                            <input
                                                value={quantity}
                                                className="h-10 w-12 border-transparent text-center sm:text-sm"
                                            />

                                            <button
                                                type="button"
                                                className="w-5 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                onClick={handleIncrement}
                                            >
                                                <PlusOutlined />
                                            </button>
                                        </div>
                                        <span className="ml-5 text-gray-400">Kho: {product?.quantity}</span>
                                    </div>
                                </Form.Item>
                                <Form.Item>
                                    <button type="submit"
                                        className="border border-primary bg-white rounded-lg py-3 px-6 text-base text-primary hover:text-white hover:bg-primary mr-3"
                                    >
                                        <ShoppingCartOutlined className="text-xl mr-1" />
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button type="submit"
                                        className="bg-primary rounded-lg py-3 px-16 text-base text-white hover:text-white hover:bg-sky-400"
                                    >
                                        Mua ngay
                                    </button>
                                </Form.Item>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mb-32">
                <h3 className='uppercase border-l-4 border-b-2 p-3 my-3 border-primary '>
                    Sản phẩm cùng loại
                </h3>
                <div className="grid grid-cols-5 gap-4 my-5 px-3">
                    {listCateProduct.map((product) => (
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
            </div>
        </div>
        <Footer />
    </>
}
export default productDetail;