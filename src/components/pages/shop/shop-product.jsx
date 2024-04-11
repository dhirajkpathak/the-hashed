import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

// import Custom Components
import SideBar from '../../features/sidebar/shop-filter';
import ProductListTwo from '../../features/product/list/product-list-two';
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import { getAllProducts, getProductsByCollection, getProductsBySubCollection } from '../../../actions/productAction';
import store from '../../../store';

function ShopProduct( props ) {
    const type = props.match.params.product;
    const { collection, subCollection } = props.location.state;
    // console.log('prop dataaaa: ', collection, subCollection);
    // const title = { "boxed": "Boxed No Sidebar", "fullwidth": "Fullwidth No Sidebar" }

    // useEffect( () => {

    //     (subCollection) ? store.dispatch( getProductsBySubCollection(subCollection) ) : store.dispatch( getProductsByCollection(collection) );
    // }, [collection, subCollection])

    // useEffect( () => {
    //     if ( type !== "boxed" && type !== "fullwidth" ) {
    //         window.location = process.env.PUBLIC_URL + "/pages/404";
    //     }
    // }, [ type ] )

    function hideSideBar() {
        if ( document.querySelector( 'body' ).classList.contains( 'sidebar-filter-active' ) )
            document.querySelector( 'body' ).classList.remove( 'sidebar-filter-active' );
    }

    return (
        <>
            <Helmet>
                <title>The Hashed | Shop Product</title>
            </Helmet>

            <h1 className="d-none">The Hashed - Shop Product</h1>

            <div className="main">
                <PageHeader title={ subCollection } />
                {/* <Breadcrumb
                    title={ subCollection }
                    parent1={ [ "Shop", "shop/nosidebar" ] }
                    adClass="mb-2"
                    container="container"
                /> */}

                <div className="page-content">
                    <div className="container">
                        <ProductListTwo type={ type } />

                        <div className="sidebar-filter-overlay" onClick={ hideSideBar }></div>

                        <SideBar numbers={ 50 } />
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo( ShopProduct );