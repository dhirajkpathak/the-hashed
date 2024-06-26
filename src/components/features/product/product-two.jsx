import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { findIndex } from '../../../utils';

function ProductTwo ( props ) {
    const { product, onAddToCart, showQuickView, isWishlist, onToggleWishlist } = props;
    console.log('product-two: ', product);

    const addToCartHandler = () => {
        if ( 0 !== product.stock )
            onAddToCart( product, 1 );
    }

    const quickViewHandler = () => {
        showQuickView( product.id );
    }

    const wishlistHandler = () => {
        if ( isWishlist ) {
            window.location = process.env.PUBLIC_URL + '/shop/wishlist';
        } else {
            onToggleWishlist( product, isWishlist );
        }
    }

    return (
        product ?
            <div className="product">
                <figure className="product-media">
                    { product.new ? <span className="product-label label-new">New</span> : '' }
                    { product.top ? <span className="product-label label-top">Top</span> : '' }
                    { product.discount ? <span className="product-label label-sale">{ product.discount }% off</span> : '' }
                    {/* { 0 === product.stock ? <span className="product-label label-out">Out Of Stock</span> : '' } */}

                    <Link to={ `${process.env.PUBLIC_URL}/product/default/${product.id}` }>
                        <LazyLoadImage
                            alt="product"
                            src={ `${process.env.PUBLIC_URL}/assets/images/products/single/centered/1-big.jpg` }
                            threshold={ 400 }
                        />

                        {/* { product.pictures[ 1 ] ? */}
                            <LazyLoadImage
                                alt="product"
                                src={ `${process.env.PUBLIC_URL}/assets/images/products/single/centered/2-big.jpg` }
                                wrapperClassName="product-image-hover product-image"
                                threshold={ 400 }
                            />
                            : ''
                        {/* } */}
                    </Link>

                    <div className="product-action action-icon-top">
                        <button className="btn-product btn-cart" onClick={ addToCartHandler }>
                            <span>add to cart</span>
                        </button>

                        <button className="btn-product btn-quickview" title="Quick view" onClick={ quickViewHandler }>
                            <span>quick view</span>
                        </button>
                    </div>
                </figure>

                <div className="product-body product-action-inner">
                    <button
                        className={ `btn-product btn-wishlist ${isWishlist ? 'added-to-wishlist' : 'remove-from-wishlist'}` }
                        onClick={ wishlistHandler }
                        title={ isWishlist ? "Go to wishlist" : "Add to wishlist" }
                    >
                        <span>{ isWishlist ? "go to wishlist" : "add to wishlist" }</span>
                    </button>

                    <div className="product-cat">
                        <span className="mr-0">
                            {/* <Link to="#">{ product.category[ 0 ] }</Link> */}
                        </span>
                    </div>

                    <h3 className="product-title">
                        <Link to={ `${process.env.PUBLIC_URL}/product/default/7` } >{ product.name }</Link>
                    </h3>

                    {
                        0 === product.stock ?
                            <div className="product-price">
                                <span className="out-price">${ product.price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                            </div> :

                            0 < product.discount ?
                                <div className="product-price">
                                    <span className="new-price">${ product.price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                                    <span className="old-price">${ product.price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                                </div> :

                                <div className="product-price">${ product.price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</div>
                    }

                    {/* <div className="ratings-container">
                        <div className="ratings">
                            <div className="ratings-val" style={ { width: product.ratings * 20 + '%' } }></div>
                        </div>
                        <span className="ratings-text">({ product.reviews } Reviews )</span>
                    </div> */}

                    {
                        product.variants ?
                            product.variants[ 0 ].model ?
                                <div className="product-nav product-nav-thumbs">
                                    { product.variants.map( ( vari, i ) =>
                                        <Link to="#" key={ i } className={ 0 === i ? 'active' : '' }>
                                            <img src={ process.env.PUBLIC_URL + '/' + vari.model } alt="product desc" />
                                        </Link>
                                    ) }
                                </div>
                                :
                                <div className="product-nav product-nav-dots">
                                    { product.variants.map( ( vari, i ) =>
                                        <Link to="#" key={ i } className={ 0 === i ? 'active' : '' } style={ { background: vari.color } }>
                                        </Link>
                                    ) }
                                </div>
                            : ''
                    }
                </div>
            </div> : ''
    );
}

export const mapStateToProps = ( state, ownprops ) => {
    return {
        isWishlist: ( findIndex( state.wishlist.list, item => item.id === ownprops.product.id ) !== -1 ) ? true : false
    };
}

export default connect( mapStateToProps )( ProductTwo );