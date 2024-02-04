import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { ICustomer } from '../../interface/Customer';
interface initialState {
      customer: ICustomer[],
      loading: boolean,
      error: string | undefined,
}
const initialState: initialState = {
      customer: [],
      loading: false,
      error: "",
}
// lấy ra tất cả thông tin 
export const getAllCustomers = createAsyncThunk(
      "customers/getcustomers", 
      async (query?: string) => {
          // console.log(query);
          const {
              data: { customer }
          } = await axios.get<{ customer: ICustomer[] }>(
              `http://localhost:8080/api/customers${query ?? ""}`
          );
          console.log(customer);
          return customer;
      }
  );
  // lấy ra 1 thông tin 
export const getIdCustomer = createAsyncThunk(
      "customers/getcustomer", 
      async (query?: string) => {
          // console.log(query);
          const {
              data: { customer }
          } = await axios.get<{ customer: ICustomer[] }>(
              `http://localhost:8080/api/customers${query ?? ""}`
          );
          console.log(customer);
          return customer;
      }
  );
  // thêm một thông tin 
export const addCustomer = createAsyncThunk(
      "customers/addcustomer", 
      async (customer: ICustomer) => {
            const { data } = await axios.post<{ customer: ICustomer }>(
                "http://localhost:8080/api/customers",
                customer
            );
    
            return data;
        }
  );
  // cập nhật 1 thông tin 
export const updateCustomer = createAsyncThunk(
      "customers/updatecustomer", 
      async (customer: ICustomer) => {
            const { data } = await axios.patch<{ customer: ICustomer }>(
                `http://localhost:8080/api/customers/${customer._id!}`,
                customer
            );
            return data;
        }
  );
  // xóa một thông tin 
export const removeCustomer = createAsyncThunk(
      "customers/deletecustomer ", 
      async (id: string) => {
            await axios.delete(`http://localhost:8080/api/customers/${id}`);
            return id;
        }
  );
  // làm cập nhật trạng thái 
const CustomerSlice = createSlice({
      name : 'customer',
      initialState,
      reducers : {
            getCustomer:(state, action)=>{
                  state.customer = action.payload
            }
      },
      extraReducers: (builder) => {
            builder
                .addCase(getAllCustomers.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getAllCustomers.fulfilled, (state, action) => {
                    console.log(action.payload);
                    state.customer = action.payload.data;
                    state.loading = false;
                })
                .addCase(getAllCustomers.rejected, (state) => {
                    state.loading = false;
                })
                // Add Product
                .addCase(addCustomer.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addCustomer.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(addCustomer.rejected, (state) => {
                    state.loading = false;
                })
                // Update Product
                .addCase(updateCustomer.pending, (state) => {
                    state.loading = true;
                })
                .addCase(updateCustomer.fulfilled, (state, action) => {
                    state.customer = state.customer?.map((product: ICustomer) =>
                        product._id === action?.payload?.customer?._id
                            ? action.payload.customer
                            : product
                    );
                    state.loading = false;
                })
                .addCase(updateCustomer.rejected, (state) => {
                    state.loading = false;
                })
                // Delete Product
                .addCase(removeCustomer.pending, (state) => {
                    state.loading = true;
                })
                .addCase(removeCustomer.fulfilled, (state, action) => {
                    state.customer = state.customer?.filter(
                        (product: ICustomer) => product._id !== action.payload
                    );
    
                    state.loading = false;
                })
                .addCase(removeCustomer.rejected, (state) => {
                    state.loading = false;
                });
        },
})
export const { getCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;