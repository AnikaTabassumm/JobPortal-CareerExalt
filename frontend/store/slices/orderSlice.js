import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { fetchPackages } from "./packageSlice";


// new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue, dispatch }) => {
    try {
      console.log(orderData)
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

        if (!token) {
          throw new Error("Authentication token is missing");
        }

      const response = await api.post("/api/orders/create", orderData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true,
      });

      dispatch(fetchPackages());
      return response.data;
    } catch (error) {
      console.error("Order creation error:", error);
      if (error.response) {
        return rejectWithValue(
          error.response?.data.message || "Failed to create order"
        );
      }

      // If it's a network error or something else
      return rejectWithValue("Network error or failed to reach the server");
    }
  }
);

export const paymentSuccess = createAsyncThunk(
  'order/paymentSuccess',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/orders/payment-success', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to handle payment failure
export const paymentFailed = createAsyncThunk(
  'order/paymentFailed',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/orders/payment-fail', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to handle payment cancellation
export const paymentCancel = createAsyncThunk(
  'order/paymentCancel',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/orders/payment-cancel', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await api.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch orders"
      );
    }
  }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await api.get(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch order"
      );
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await api.put(
        `/api/orders/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to update order"
      );
    }
  }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await api.delete(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete order"
      );
    }
  }
);

// Slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    // orders: [],
    orderData: null,
    payment: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    resetOrderState: (state) => {
      state.orderData = null;
      state.payment = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        // state.orders.push(action.payload);
        state.orderData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture the error message
        console.error('Order creation error:', action.error);
      })

      // Handle paymentSuccess
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = 'paid';
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Payment success callback failed';
      })

      // Handle paymentFailed
      .addCase(paymentFailed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentFailed.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = 'failed';
      })
      .addCase(paymentFailed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Payment failure callback failed';
      })

      // Handle paymentCancel
      // .addCase(paymentCancel.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(paymentCancel.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.payment = 'cancelled';
      // })
      // .addCase(paymentCancel.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || 'Payment cancel callback failed';
      // })

      // Fetch All Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.message = "Order status updated successfully";
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.id
        );
        state.message = "Order deleted successfully";
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = orderSlice.actions;
export default orderSlice.reducer;
