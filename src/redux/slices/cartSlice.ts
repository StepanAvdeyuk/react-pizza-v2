import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from '../../utils/getCartFromLS';

export type CartItem = {
    id: string,
    name: string,
    size: number,
    type: number,
    count: number,
    price: number,
    imageUrl: string
};

interface CartSliceState {
    totalPrice: number,
    cartItems: CartItem[]
}

const {cartItems, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    cartItems
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setTotalPrice (state, action: PayloadAction<number>) {
            state.totalPrice = action.payload;
        },
        addCartItem (state, action: PayloadAction<CartItem>) {
            const findItem = state.cartItems.find(item => item.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.cartItems.reduce((sum, item) => {
                return (item.price * item.count) + sum;
            }, 0)
        },
        clearCartItems (state) {
            state.cartItems = [];
            state.totalPrice = 0;
        },
        decCartItem (state, action: PayloadAction<string>) {
            const findItem = state.cartItems.find(item => item.id === action.payload);
            if (findItem) {
                findItem.count--;
                state.totalPrice = state.totalPrice - findItem.price;
            }
        },
        removeCartItem (state, action: PayloadAction<string>) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            state.totalPrice = state.cartItems.reduce((sum, item) => {
                return (item.price * item.count) + sum;
            }, 0)
        }
     }
});

export const { setTotalPrice, addCartItem, clearCartItems, decCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;