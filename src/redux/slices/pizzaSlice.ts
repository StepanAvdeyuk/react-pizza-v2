import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

export type PizzaItem = {
    id: string;
    name: string;
    sizes: number[];
    types: number[];
    price: number;
    imageUrl: string;
    category: number;
    rating: number;
};

interface PizzaSliceState {
    items: PizzaItem[];
    status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading' 

};

type FetchPizzaArgs = Record<string, string>;

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async (params: FetchPizzaArgs) => {
        const {pagination, category, sort, filter} = params;
        const { data } = await axios.get(`https://62b2faca4f851f87f45160b1.mockapi.io/items?${pagination}${category}${sort}${filter}`);
        return data as PizzaItem[];
    }
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.status = 'loading'; 
            state.items = [];
        });
        builder.addCase(fetchPizza.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
            state.status = 'success';
            state.items = action.payload;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.status = 'error';
        });
    }
    // extraReducers: {
    //     [fetchPizza.pending] : (state) => {
    //         state.status = 'loading';
    //     },
    //     [fetchPizza.fulfilled] : (state, action) => {
    //         state.status = 'success';
    //         state.items = action.payload;
    //     },
    //     [fetchPizza.rejected] : (state) => {
    //         state.status = 'error';
    //     }
    // }
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;