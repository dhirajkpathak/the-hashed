import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCartTotal } from '../../../services';
import { addToCartUnsafe, removeFromCart } from '../../../actions/cartActions';
import { safeContent } from '../../../utils';
import { getCartCount, getCartDetails } from '../../../utils/APIUtils';

function CartMenu ( props ) {
    const { cartlist, removeFromCart, addToCartUnsafe } = props;
    const [cartCount, setCartCount] = useState(0);
    console.log("cart list: ", cartlist);
    
    let total = getCartTotal( cartlist );

    useEffect(() => {

        getCartCount().then(response => {

            // console.log("latest product Response: ", response); 
            setCartCount(response);
        });
        getCartDetails().then(response => {
            console.log("get all items in cart res: ", response);
            //then iterate and call add_to_cart_unsafe for each item of dispatch on caerreducer
            //mapToDispatch has been declared, just need to modify it accordingly
            // dispatch(addToCartUnsafe(productInfo, qty));
            response.map(items => addToCartUnsafe(items.product, items.product.quantity));
            // props.addToCartUnsafe()
        });
    }, [])

    return (
        <div className="dropdown cart-dropdown">
            <Link to={ `${process.env.PUBLIC_URL}/shop/cart` } className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                <i className="icon-shopping-cart"></i>
                <span className="cart-count">{ cartCount }</span>
                <span className="cart-txt">$ { total.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
            </Link>

            <div className={ `dropdown-menu dropdown-menu-right ${cartlist.length === 0 ? 'text-center' : ''}` } >
                {
                    0 === cartlist.length ?
                        <p>No products in the cart.</p> :
                        <>
                            <div className="dropdown-cart-products">
                                { cartlist.map( ( item, index ) => (
                                    <div className="product" key={ index }>
                                        <div className="product-cart-details">
                                            <h4 className="product-title">
                                                <Link to={ `${process.env.PUBLIC_URL}/product/default/7` } dangerouslySetInnerHTML={ safeContent( item.name ) }></Link>
                                            </h4>

                                            <span className="cart-product-info">
                                                <span className="cart-product-qty">{ item.quantity }</span>
                                                x ${ item.discount ? item.price - item.discount : item.price }
                                            </span>
                                        </div>

                                        <figure className="product-image-container">
                                            <Link to={ `${process.env.PUBLIC_URL}/product/default/7` } className="product-image">
                                                <img src={ `${process.env.PUBLIC_URL}/assets/images/products/single/centered/1-big.jpg` } data-oi={ `${process.env.PUBLIC_URL}/assets/images/products/single/centered/1-big.jpg` } alt="product" />
                                            </Link>
                                        </figure>
                                        <button className="btn-remove" title="Remove Product" onClick={ () => removeFromCart( item.id ) }><i className="icon-close"></i></button>
                                    </div>
                                ) ) }
                            </div>
                            <div className="dropdown-cart-total">
                                <span>Total</span>

                                <span className="cart-total-price">${ total.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                            </div>

                            <div className="dropdown-cart-action">
                                <Link to={ `${process.env.PUBLIC_URL}/shop/cart` } className="btn btn-primary">View Cart</Link>
                                <Link to={ `${process.env.PUBLIC_URL}/shop/checkout` } className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right"></i></Link>
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

function mapStateToProps ( state ) {
    return {
        cartlist: state.cartlist.cart ? state.cartlist.cart : []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // removeUser: () => dispatch(removeUser()),
        // showModal: (modal) => dispatch(showModal(modal))
        removeFromCart: (productId) => dispatch(removeFromCart(productId)),
        addToCartUnsafe: (productInfo, qty) => dispatch(addToCartUnsafe(productInfo, qty))

    }
}

export default connect( mapStateToProps,  mapDispatchToProps )( CartMenu );