import * as types from '../constants/action-types';
import { getAllProduct, getProductByCollectionName, getAllProductBySubcollection } from '../utils/APIUtils';

// get all products
export const getAllProducts = () => dispatch => {
    getAllProduct().then( products => {
        dispatch( receiveProducts( products ) );
        console.log('getAllProducts: ', products);
        return products;
    } )
}
// get all products by collection
export const getProductsByCollection = (collection) => dispatch => {
    getProductByCollectionName(collection).then( products => {
        console.log('getProductsByCollection: ', products);
        dispatch( receiveProducts( products ) );
        return products;
    } )
}

// get all products by sub-collection
export const getProductsBySubCollection = (subCollection) => dispatch => {
    getAllProductBySubcollection(subCollection).then( products => {
        console.log('getProductsBySubCollection: ', products)
        dispatch( receiveProducts( products ) );
        // return products;
    } )
}

// recieve products
export const receiveProducts = products => ( {
    type: types.RECEIVE_PRODUCTS,
    products
} );