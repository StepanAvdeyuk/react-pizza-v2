import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, item) => {
        return (item.price * item.count) + sum;
    }, 0)
}