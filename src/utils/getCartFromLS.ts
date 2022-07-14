import { calcTotalPrice } from "./calcTotalPrice";
import { CartItem } from "../redux/slices/cartSlice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const price = calcTotalPrice(items);

    return {
        cartItems: items as CartItem[], 
        totalPrice: price
    }

}