import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/app';
import Sidebar from '../components/pages/shop/sidebar';
import NoSidebar from '../components/pages/shop/nosidebar';
import ProductCategory from '../components/pages/shop/product-category';
import Dashboard from '../components/pages/shop/dashboard';
import MyAccount from '../components/pages/shop/my-account';
import Wishlist from '../components/pages/shop/wishlist';
import Cart from '../components/pages/shop/cart';
import Checkout from '../components/pages/shop/checkout';
import Market from '../components/pages/shop/market';
import ShopProduct from '../components/pages/shop/shop-product';

export default function ShopRoute() {
    return (
        <Switch>
            <Layout>
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/:grid` } component={ ShopProduct } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/category/:grid` } component={ ProductCategory } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/sidebar/:grid` } component={ Sidebar } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/nosidebar/:grid` } component={ NoSidebar } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/market` } component={ Market } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/dashboard` } component={ Dashboard } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/myaccount` } component={ MyAccount } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/wishlist` } component={ Wishlist } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/cart` } component={ Cart } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/checkout` } component={ Checkout } />
            </Layout>
        </Switch>
    );
}