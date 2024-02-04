import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
        vourcher_code: {
            type: String,
        },
        status: {
            type: Number,
            default: 1,
        },
        paymentStatus: {
            type: Number,
            default: 0,
        },
        pay_method: {
            type: String,
        },
        orderDetails: [{ type: mongoose.Types.ObjectId, ref: "OrderDetail" }],
        totalMoney: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true, versionKey: false }
);
orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
