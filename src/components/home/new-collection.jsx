import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

// Import Custom Component
import ProductNine from '../features/product/product-nine';

//Import Service & Actions
import { getFeaturedProducts } from '../../services';
import { toggleWishlist } from '../../actions';
import { addToCart } from '../../actions/cartActions';
import { getLatestProduct } from '../../utils/APIUtils';

function NewCollection ( props ) {
    const { addToCart, toggleWishlist } = props;
    const [latestProducts, setLatestProducts] = useState([]);
    let products = props.products;
    products = products.slice( 0, 37 );
    console.log("producttt:; ", products);
    

    // let latestProducts;
    useEffect(() => {
        let isSubscribed = true
        getLatestProduct().then(response => {

            console.log("latest product Response: ", response);
            setLatestProducts(response);
        })
        return () => isSubscribed = false
    }, [])

    let featuredProducts = getFeaturedProducts( products );
    // console.log("Feature product: ", featuredProducts);
    

    return (
        <div className="container">
            <h2 className="title text-center mb-4">New Arrivals</h2>

            <div className="products">
                <div className="row justify-content-center">
                    {
                        latestProducts.map( ( item, index ) =>
                            <div className="col-6 col-md-4 col-lg-3" key={ index + item.name }>
                                <ProductNine product={ item }
                                    adClass="text-center"
                                    key={ index + item.name }
                                    onAddToCart={ addToCart }
                                    onToggleWishlist={ toggleWishlist }
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="more-container text-center mt-2">
                <Link to={ `${process.env.PUBLIC_URL}/shop/sidebar/list` } className="btn btn-more"><span>show more</span></Link>
            </div>

        </div>
    )
}

const mapStateToProps = ( state, props ) => {
    return {
        products: state.data.products ? state.data.products : []
    }
}

export default connect(
    mapStateToProps, { addToCart, toggleWishlist }
)( NewCollection );
