import * as types from '../constants/action-types'
import * as api from '../api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { addItemToCart, removeItemFromCart, getCartCount } from '../utils/APIUtils';

/************ Cart Action **************/
// add item to cart
export const addToCart = (productInfo, qty) => (dispatch) => {

    addItemToCart(productInfo).then(response => {

        console.log("Add to cart response: ", response);
        toast.success("Item Added to Cart");
        dispatch(addToCartUnsafe(productInfo, qty));
    })
}

export const addToCartFromWishlist = (productInfo, qty) => (dispatch) => {
    // toast.success( "Item added to Cart" );

    addItemToCart(productInfo).then(response => {

        console.log("Add to cart response: ", response);
        toast.success("Item Added to Cart");
        dispatch({
            type: types.REMOVE_FROM_WISHLIST,
            productId: productInfo.id
        })

        dispatch(addToCartUnsafe(productInfo, qty));
    })
}

// add item to cart : typical action
export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});

// remove item from cart
export const removeFromCart = productId => (dispatch) => {
    removeItemFromCart(productId).then(response => {

        console.log("remove from cart: ", response);
        toast.error("Item removed from Cart");
        dispatch(removeFromCartUnsafe(productId));
    })
};

export const removeFromCartUnsafe = productId => ({

    type: types.REMOVE_FROM_CART,
    productId
});