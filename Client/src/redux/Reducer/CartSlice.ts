import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ICart from "../../interface/cart";

interface initialState {
    carts: ICart[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initialState = {
    carts: [],
    loading: false,
    error: "",
};

export const getAllCart = createAsyncThunk(
    "carts/getCarts",
    async (query?: string) => {
        console.log(query);
        const {
            data: { carts }
        } = await axios.get<{ carts: ICart[] }>(
            `http://localhost:8080/api/carts${query ?? ""}`
        );
        return carts;
    }
);

export const createCart = createAsyncThunk(
    "carts/addCarts",
    async (cart: ICart) => {
        const { data } = await axios.post<{ cart: ICart }>(
            "http://localhost:8080/api/carts",
            cart
        );

        return data;
    }
);

export const updateCart = createAsyncThunk(
    "carts/updateCarts",
    async (cart: ICart) => {
        const { data } = await axios.patch<{ cart: ICart }>(
            `http://localhost:8080/api/carts/${cart._id!}`,
            cart
        );
        return data;
    }
);

export const removeCart = createAsyncThunk(
    "carts/removeCarts",
    async (id: string) => {
        await axios.delete(`http://localhost:8080/api/carts/${id}`);

        return id;
    }
);
export const updateCartQuantityAsync = createAsyncThunk(
    "carts/updateQuantity",
    async ({ productId, quantity, totalMoney }: { productId: string; quantity: number, totalMoney: number }) => {
        const response = await axios.patch(`http://localhost:8080/api/carts/${productId}`, { quantity, totalMoney });
        console.log("API Response:", response.data);
        return response.data;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCart: (state, action) => {
            state.carts = action.payload;
        },
        updateCartQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            state.carts = state.carts.map((cartItem) =>
                cartItem._id === productId ? { ...cartItem, quantity } : cartItem
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCartQuantityAsync.fulfilled, (state, action) => {
                const updatedCartItem = action.payload;
                state.carts = state.carts.map((cartItem) =>
                    cartItem._id === updatedCartItem._id ? updatedCartItem : cartItem
                );
            })
            .addCase(getAllCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCart.fulfilled, (state, action) => {
                state.carts = action.payload;
                state.loading = false;
            })
            .addCase(getAllCart.rejected, (state) => {
                state.loading = false;
            })
            // Add cart
            .addCase(createCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCart.fulfilled, (state, action) => {
                state.loading = false;

                const newItem = action.payload.data;

                // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                const checkItem = state.carts.findIndex(item => item.productId === newItem.productId);

                if (checkItem !== -1) {
                    // Sản phẩm đã tồn tại, cập nhật số lượng
                    state.carts[checkItem].quantity = newItem.quantity;
                } else {
                    // Sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                    state.carts = [...state.carts, newItem];
                }
            })
            .addCase(createCart.rejected, (state) => {
                state.loading = false;
            })
            // Update cart
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.carts = state.carts?.map((cart: ICart) =>
                    cart._id === action?.payload?.cart?._id
                        ? action.payload.cart
                        : cart
                );
                state.loading = false;
            })
            .addCase(updateCart.rejected, (state) => {
                state.loading = false;
            })
            // Delete cart
            .addCase(removeCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.carts = state.carts?.filter(
                    (cart: ICart) => cart._id !== action.payload
                );

                state.loading = false;
            })
            .addCase(removeCart.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { getCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;

