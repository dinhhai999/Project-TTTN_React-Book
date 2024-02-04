import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Iuser } from "../../interface/user";

interface initialState {
    user: Iuser[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initialState = {
      user: [],
    loading: false,
    error: "",
};
// lấy ra tất cả sản phẩn 
export const getAllProduct = createAsyncThunk(
    "products/getProducts", 
    async (query?: string) => {
        // console.log(query);
        const {
            data: { products }
        } = await axios.get<{ products: Iuser[] }>(
            `http://localhost:8080/api/products${query ?? ""}`
        );
        // console.log(products);
        return products;
    }
);
// cập nhật sản phẩm 
export const updateProduct = createAsyncThunk(
    "products/updateProducts",
    async (product: Iuser) => {
        const { data } = await axios.patch<{ product: Iuser }>(
            `http://localhost:8080/api/products/${product._id!}`,
            product
        );
        return data;
    }
);
// xóa sản phẩm 
export const removeProduct = createAsyncThunk(
    "products/removeProducts",
    async (id: string) => {
        await axios.delete(`http://localhost:8080/api/products/${id}`);

        return id;
    }
);
// làm cập nhật trang thái snar 
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.user = action.payload.data;
                state.loading = false;
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.loading = false;
            })
            // Add Product
            // .addCase(createProduct.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(createProduct.fulfilled, (state) => {
            //     state.loading = false;
            // })
            // .addCase(createProduct.rejected, (state) => {
            //     state.loading = false;
            // })
            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.user = state.user?.map((product: Iuser) =>
                    product._id === action?.payload?.product?._id
                        ? action.payload.product
                        : product
                );
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state) => {
                state.loading = false;
            })
            // Delete Product
            .addCase(removeProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.user = state.user?.filter(
                    (product: Iuser) => product._id !== action.payload
                );

                state.loading = false;
            })
            .addCase(removeProduct.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { getUser } = UserSlice.actions;
export default UserSlice.reducer;

