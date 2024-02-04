import React, { useEffect, useState } from 'react';
import type { FormInstance, UploadProps } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    message,
    Upload,
    Image,
    Badge,
    Spin,
    Breadcrumb
} from 'antd';
import {
    UploadOutlined,
    CloseCircleFilled
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import ICategory from '../../../interface/category';
import { getAllCategory } from '../../../redux/Reducer/CategorySlice';
import { getAllProduct, updateProduct } from '../../../redux/Reducer/ProductSlice';
import IProduct from '../../../interface/product';
const { Dragger } = Upload;
const { TextArea } = Input;


const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} className='bg-blue-500'>
            Submit
        </Button>
    );
};

const productUpdate = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category.categories);
    const products = useAppSelector((state) => state.product.products);

    const selectOptions = categories
        ?.filter((cate: ICategory) => cate.name !== "Uncategorized") // Loại bỏ danh mục "Uncategorized"
        .map((cate: ICategory) => ({
            label: `${cate.name}`,
            value: `${cate._id!}`,
        }));
    useEffect(() => {
        void dispatch(getAllCategory());
        void dispatch(getAllProduct());
    }, [dispatch]);

    const { id } = useParams();
    const product = products?.find((product: IProduct) => product._id === id);
    const [form] = Form.useForm();
    form.setFieldsValue({
        _id: product?._id,
        name: product?.name,
        author: product?.author,
        price: product?.price,
        discount: product?.discount,
        images: product?.images,
        quantity: product?.quantity,
        description: product?.description,
        categoryId: product?.categoryId?._id ?? product?.categoryId,
    });
    console.log(product);

    const [imageList, setImageList] = useState<string[]>(product?.images || []);
    const handleRemoveImage = (index: number) => {
        const updatedImages = [...imageList];
        updatedImages.splice(index, 1);
        setImageList(updatedImages);
    };
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async (values: any) => {
        setIsLoading(true);
        let newImages: string[] = [];

        if (values?.images.file) {
            newImages = values.images.fileList.map(({ response }: any) => response.urls[0].url);
        }

        const updatedImageList = [...imageList, ...newImages];

        const newValues = { ...values, images: updatedImageList };
        console.log("New", newValues);

        void dispatch(updateProduct(newValues));
        await message.success(`Update product successfully!!`);
        navigate("/admin/product");
    };

    const props: UploadProps = {
        listType: "picture",
        name: "image",
        multiple: true,
        action: "http://localhost:8080/api/images/upload",
    };


    return <>
        {isLoading ? (

            <div className="text-center ">
                <Spin size="large" className='mt-16' />
            </div>
        ) : (
            <div className="">
                <Breadcrumb
                    className='mb-3'
                    items={[
                        {
                            title: <Link to={`/`}>Product</Link>,
                        },
                        {
                            title: 'Update',
                        },
                    ]}
                />
                <div className='border p-3 rounded-xl bg-white'>
                    <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff] mb-5">
                        Create New Product
                    </h3>
                    <Form
                        form={form}
                        name="validateOnly"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        className="mx-auto"
                    >
                        <Form.Item name="_id" style={{ display: "none" }}>
                            <Input />
                        </Form.Item>
                        <div className='grid grid-cols-3 gap-5'>
                            {/* Input Name */}
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!'
                                    }
                                ]}>
                                <Input />
                            </Form.Item>

                            {/* Input Author */}
                            <Form.Item
                                name="author"
                                label="Author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Author!'
                                    }
                                ]}>
                                <Input />
                            </Form.Item>

                            {/* Input Category */}
                            <Form.Item name="categoryId" label="Category" rules={[{ required: true, message: 'Please input your Category!' }]}>
                                <Select
                                    placeholder="Select a category"
                                    allowClear
                                    options={selectOptions}
                                ></Select>
                            </Form.Item>
                        </div>

                        <div className='grid grid-cols-3 gap-5'>
                            {/* Input Price */}
                            <Form.Item className=''
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: 'Please input your Price!' }]}
                            >
                                <InputNumber
                                    min={0}
                                    formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            {/* Input Price */}
                            <Form.Item
                                name="discount"
                                label="Discount"
                            >
                                <InputNumber
                                    min={0}
                                    formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            {/* Input Quantity */}
                            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input your Quantity!' }]}>
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </div>

                        <div className="grid grid-flow-row-dense grid-cols-3 gap-5">
                            <div className="">
                                <Form.Item label="Images">
                                    {product?.images && (
                                        <Image.PreviewGroup>
                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {imageList.map((image, index) => (
                                                    <div key={index} style={{ marginRight: '20px', marginBottom: '20px' }}>
                                                        <Badge count={<CloseCircleFilled
                                                            onClick={() => handleRemoveImage(index)}
                                                            className='text-xl text-red-500 rounded-full bg-white'
                                                        />}>
                                                            <Image width={100} src={image} />
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </Image.PreviewGroup>
                                    )}
                                </Form.Item>
                                {/* Upload Images */}
                                <Form.Item label="Images" name="images" rules={[{ required: true, message: 'Please input your Image!' }]}
                                    className=''
                                >
                                    <Dragger {...props}>
                                        <Button icon={<UploadOutlined />}>Choose images</Button>
                                    </Dragger>
                                </Form.Item>
                            </div>

                            {/* Input Desription */}
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true, message: 'Please input your Description!'
                                    }
                                ]}
                                className='col-span-2'
                            >
                                <TextArea rows={8} />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Space>
                                <SubmitButton form={form} />
                                <Button htmlType="reset">Reset</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        )}

    </>
}
export default productUpdate;
