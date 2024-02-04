import Cart from "../models/cart";
import User from "../models/user";
export const getAll = async (req, res) => {
    try {
        // const { docs: carts } = await Cart.paginate(optinos);
        const carts = await Cart.find()
        if (!carts) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            message: "Get product list successfully!",
            carts
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate(
            "productId",
            "cart"
        );
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            message: "Cart found successfully",
            cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const create = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        // Kiểm tra xem có sản phẩm trong giỏ hàng của người dùng không
        const existingCart = await Cart.findOne({ productId, userId });

        if (existingCart) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật thông tin
            const newQuantity = existingCart.quantity + req.body.quantity;
            const newTotalMoney = existingCart.totalMoney + req.body.totalMoney;

            const updatedCart = await Cart.findOneAndUpdate(
                { productId, userId },
                { quantity: newQuantity, totalMoney: newTotalMoney },
                { new: true }
            );

            if (!updatedCart) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            }

            return res.status(200).json({
                message: "Cart updated successfully",
                data: updatedCart,
            });
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, tạo mới
            const cart = await Cart.create(req.body);

            if (!cart) {
                return res.status(404).json({
                    message: "Cart not found",
                });
            }

            return res.status(200).json({
                message: "Cart created successfully",
                data: cart,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const remove = async (req, res) => {
    try {

        const cart = await Cart.findOneAndDelete({ _id: req.params.id });
        console.log(cart);
        const itemRemove = cart._id;

        User.updateOne(cart.userId, {
            $pull: { cartId: itemRemove }
        });
        return res.status(200).json({
            message: "Cart delete successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }
        return res.status(200).json({
            message: "Cart updated successfully",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

