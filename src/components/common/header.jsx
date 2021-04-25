import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Common Header Components
import MainMenu from './partials/main-menu';
import CartMenu from './partials/cart-menu';
import SearchForm from './partials/search-form';
import LoginModal from '../features/modal/login-modal';

import { showModal } from '../../actions';
import { removeUser } from '../../actions/userActions';
import { ACCESS_TOKEN, USER_INFO } from '../../constants/api-constants';

function Header(props) {
    const { container = "container", isWishlist, showModal, removeUser } = props;

    function openLoginModal(e) {
        showModal('login');
        e.preventDefault();
    }

    const onLogout = () => {

        const useri = localStorage.getItem(USER_INFO);
        console.log("user profile: ", useri);
        removeUser();
        console.log("logged out", props);
    }

    const UserName = () => {

        const user = props.userReducer.user || '';
        return <Link to="#">{user.firstName || ''}</Link>;
    }

    // console.log("header props: ", props);


    return (
        <header className="header header-6">
            <div className="header-top">
                <div className={container}>

                    <div className="header-right">
                        {
                            !props.userReducer.loggedIn
                                ? (<ul className="top-menu top-link-menu">
                                    <li>
                                        <Link to="#">Links</Link>
                                        <ul>
                                            <li><Link to="#signin-modal" data-toggle="modal" onClick={openLoginModal}><i className="icon-user"></i>Login</Link></li>
                                        </ul>
                                    </li>
                                </ul>) :
                                (<div className="header-dropdown">
                                    {/* <Link to="#">{props.userReducer.user.firstName || ''}</Link> */}
                                    <UserName />
                                    <div className="header-menu">
                                        <ul>
                                            <li><Link to={`${process.env.PUBLIC_URL}/shop/myaccount`}>My Account</Link></li>
                                            <li><Link to="#" onClick={onLogout}>Logout</Link></li>
                                        </ul>
                                    </div>
                                </div>)
                        }
                        <div className="header-dropdown">
                            <Link to="#">USD</Link>
                            <div className="header-menu">
                                <ul>
                                    <li><Link to="#">Eur</Link></li>
                                    <li><Link to="#">Usd</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="header-dropdown">
                            <Link to="#">Eng</Link>
                            <div className="header-menu">
                                <ul>
                                    <li><Link to="#">English</Link></li>
                                    <li><Link to="#">French</Link></li>
                                    <li><Link to="#">Spanish</Link></li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="header-middle">
                <div className={container}>
                    {/* <div className="header-left">
                        <SearchForm />
                    </div> */}

                    <div className="header-center">
                        <Link to={`${process.env.PUBLIC_URL}`} className="logo">
                            {/* <img src={`${process.env.PUBLIC_URL}/assets/images/home/logo.png`} alt="Molla Logo" width={82} height={20} /> */}
                            <h2><i>|#'</i></h2>
                        </Link>
                    </div>

                    <div className="header-right">
                        <Link to={`${process.env.PUBLIC_URL}/shop/wishlist`} className="wishlist-link">
                            <i className="icon-heart-o"></i>
                            <span className="wishlist-count">{isWishlist.length}</span>
                            <span className="wishlist-txt">My Wishlist</span>
                        </Link>
                        <CartMenu />
                    </div>
                </div>
            </div>

            <div className="header-bottom sticky-header">
                <div className={container}>
                    <div className="header-left">
                        <button className="mobile-menu-toggler">
                            <span className="sr-only">Toggle mobile menu</span>
                            <i className="icon-bars"></i>
                        </button>
                        <MainMenu />
                    </div>
                </div>
            </div>
            <LoginModal />
        </header>
    );
}

function mapStateToProps(state) {
    return {
        isWishlist: state.wishlist.list,
        userReducer: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: () => dispatch(removeUser()),
        showModal: (modal) => dispatch(showModal(modal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);