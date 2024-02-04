import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const customerSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        email: { type: String, trim: true, required: true, unique: true, lowercase: true },
        address: { type: String, trim: true },
        phone: { type: String, trim: true },
        dateOfBirth: { type: Date },
    },
    { timestamps: true, versionKey: false }
);
// Plugin paginate cho phép phân trang
customerSchema.plugin(paginate);
export default mongoose.model("Customer", customerSchema);
