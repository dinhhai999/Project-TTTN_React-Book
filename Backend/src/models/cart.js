import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        nameProduct: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        totalMoney: {
            type: Number,
            required: true,
            min: 0,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);
cartSchema.plugin(mongoosePaginate);

export default mongoose.model("Cart", cartSchema);
