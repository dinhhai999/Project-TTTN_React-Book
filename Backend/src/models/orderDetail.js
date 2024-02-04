import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderDetailSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        productId: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        nameProduct: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            min: 0,
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            required: true
        },
        totalMoney: {
            type: Number,
            required: true
        },
    },
    { timestamps: true, versionKey: false }
);
orderDetailSchema.plugin(mongoosePaginate);

export default mongoose.model("OrderDetail", orderDetailSchema);
