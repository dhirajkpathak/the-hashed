import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import { showModal, closeModal } from '../../../actions';
import AddressModal from '../../features/modal/address-modal';
import AddAddressModal from '../../features/modal/add-address-modal';
import CardModal from '../../features/modal/card-modal';
import { getAddress, updateAddress, updateAccountDetails, getProfileDetails, getSavedCard, addCustomerCard, addAddress } from '../../../utils/APIUtils';

function MyAccount(props) {

    const { showModal } = props;
    const [address, setAddress] = useState({});
    const [profileDetails, setProfileDetails] = useState({});
    const [customerCard, setCustomerCard] = useState([]);

    const { register, handleSubmit, errors } = useForm();

    function closeNewAddressModal() {
        document.getElementById("address-modal").classList.remove("ReactModal__Content--after-open");

        // timer = setTimeout(() => {
        //     props.closeModal('address');
        // }, 200);
        props.closeModal('address');
    }

    function closeCardModal() {
        document.getElementById("card-modal").classList.remove("ReactModal__Content--after-open");
        props.closeModal('card');
    }

    useEffect(() => {
        getAddress().then(add => {

            // console.log("address: ", add);
            (add.length > 0 ? setAddress(add[0]) : setAddress({}));
        });
        getProfileDetails().then(profileData => {

            console.log("account summary: ", profileData);
            setProfileDetails(profileData);
        });
        getSavedCard().then(card => {
            setCustomerCard(card);
            console.log("card details: ", card);

        })
    }, [])

    const onSubmitCardForm = (data, e) => {
        const { cardNo, customerName, cvv, expiryDate, ...billingAddress } = data;
        // const {cardNo, customerName, cvv, expiryDate} = data;
        const newData = {
            cardNo: cardNo,
            customerName: customerName,
            cvv: cvv,
            expiryDate: expiryDate,
            cardTypePojo: {
                cardType: "CreditCard",
                cardCompanyName: "VISA"
            },
            customerAddressPojo: billingAddress,
            isVerified: false,
            isdefault: true
        }

        console.log("add card data: ", newData);

        addCardDetails(newData, e);
        // saveAddressData(billingAddress, e);
    }

    const addCardDetails = (data, e) => {

        console.log("card data: ", data);

        addCustomerCard(data).then(res => {
            setCustomerCard([...customerCard, data]);
            closeCardModal();
        }).catch(error => {

            console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        })
    }

    const saveAddressData = (data, e) => {

        console.log("billing addresss data: ", data);

        addAddress(data)
            .then(response => {

                // console.log("Response: ", response);
                // closeModal();

            }).catch(error => {
                console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    };

    const onSubmitAddressData = (data, e) => {

        data['id'] = address.id;
        updateAddress(data)
            .then(response => {

                // console.log("Response: ", response);
                closeNewAddressModal();
                setAddress(data);
                // this.props.history.push("/");
                // redirectLogin();

            }).catch(error => {
                console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    };

    const onSubmitAccountSummary = (data, e) => {

        if (data.email === profileDetails.emailId) {
            delete data.email
        }
        if (data.mobile === profileDetails.mobileNo) {
            delete data.mobile
        }
        e.preventDefault();
        console.log("Data: ", data);
        updateAccountDetails(data)
            .then(response => {

                console.log("Response: ", response);
            }).catch(error => {
                console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    };

    function openAddressModal(e) {
        showModal('address');
        e.preventDefault();
    }

    function openNewAddressModal(e) {
        showModal('add-address');
        e.preventDefault();
    }

    function openNewCardModal(e) {
        showModal('card');
        e.preventDefault();
    }

    const CardComponent = ({ cards }) => (
        <>
            {cards.map(card => (
                <p key={card.id}>
                    {card.customerName} <br />
                    {card.cardNo} <br />
                </p>
            ))}
        </>
    )

    return (
        <>
            <Helmet>
                <title>Molla React eCommerce Template | My Account</title>
            </Helmet>

            <h1 className="d-none">Molla React eCommerce Template - My Account</h1>

            <div className="main">
                <PageHeader title="My Account" subTitle="Shop" />
                <Breadcrumb title="My Account" parent1={["Shop", "shop/sidebar/list"]} adClass="mb-3" />

                <div className="page-content">
                    <div className="dashboard">
                        <div className="container">
                            <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                                <Tabs selectedTabClassName="active show">
                                    <div className="row">
                                        <aside className="col-md-4 col-lg-3">
                                            <TabList>

                                                <Tab className="nav-item">
                                                    <span className="nav-link">Orders</span>
                                                </Tab>

                                                <Tab className="nav-item">
                                                    <span className="nav-link">Addresses</span>
                                                </Tab>

                                                <Tab className="nav-item">
                                                    <span className="nav-link">Account Details</span>
                                                </Tab>

                                                <Tab className="nav-item">
                                                    <span className="nav-link">Saved Card</span>
                                                </Tab>
                                            </TabList>
                                        </aside>

                                        <div className="col-md-8 col-lg-9" style={{ marginTop: "1rem" }}>
                                            <div className="tab-pane">
                                                <TabPanel>
                                                    <p>No order has been made yet.</p>
                                                    <Link to={`${process.env.PUBLIC_URL}/shop/siebar/list`} className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></Link>
                                                </TabPanel>

                                                <TabPanel>
                                                    <p>The following addresses will be used on the checkout page by default.</p>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="card card-dashboard">
                                                                <div className="card-body">
                                                                    <h3 className="card-title">Billing Address</h3>

                                                                    {!!address.firstName
                                                                        ? <p>
                                                                            {address.firstName} {address.lastName}<br />
                                                                            {address.companyName}<br />
                                                                            {address.address1}<br />
                                                                            {address.address2}<br />
                                                                            {address.city}<br />
                                                                            {address.country}<br />
                                                                            {address.region}<br />
                                                                            {address.zipCode}<br />
                                                                            {address.mobileNo}<br />
                                                                            <Link to="#" onClick={openAddressModal}>Edit <i className="icon-edit"></i></Link>
                                                                        </p>
                                                                        : <p>You have not set up this type of address yet.<br />
                                                                            <Link to="#" onClick={openNewAddressModal}>Add <i className="icon-edit"></i></Link></p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div className="card card-dashboard">
                                                                <div className="card-body">
                                                                    <h3 className="card-title">Shipping Address</h3>

                                                                    <p>You have not set up this type of address yet.<br />
                                                                        <Link to="#">Edit <i className="icon-edit"></i></Link>
                                                                        <Link to="#">Delete <i className="icon-trash"></i></Link></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>

                                                <TabPanel>
                                                    <form action="#" onSubmit={handleSubmit(onSubmitAccountSummary)}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label htmlFor="first-name">First Name *</label>
                                                                <input type="text" className="form-control" id="first-name" name="firstname" defaultValue={profileDetails.firstName} ref={register({ required: false })} />
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <label htmlFor="last-name">Last Name *</label>
                                                                <input type="text" className="form-control" id="last-name" name="lastname" defaultValue={profileDetails.lastName} ref={register({ required: false })} />
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label htmlFor="singin-email">Email address *</label>
                                                                <input type="text" className="form-control" id="singin-email" name="email" defaultValue={profileDetails.emailId} ref={register({ required: false, pattern: /^\S+@\S+$/i })} />
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <label htmlFor="register-mobile">Mobile *</label>
                                                                <input type="text" className="form-control" id="register-mobile" name="mobile" defaultValue={profileDetails.mobileNo} ref={register({ required: false })} />
                                                            </div>
                                                        </div>

                                                        {/* <label>Current password (leave blank to leave unchanged)</label>
                                                        <input type="password" className="form-control" />

                                                        <label>New password (leave blank to leave unchanged)</label>
                                                        <input type="password" className="form-control" />

                                                        <label>Confirm new password</label>
                                                        <input type="password" className="form-control mb-2" /> */}

                                                        <button type="submit" className="btn btn-outline-primary-2">
                                                            <span>SAVE CHANGES</span>
                                                            <i className="icon-long-arrow-right"></i>
                                                        </button>
                                                    </form>
                                                </TabPanel>

                                                <TabPanel>
                                                    <h5 className="text-center">Saved Card</h5>
                                                    <Link to="#" onClick={openNewCardModal}>ADD A NEW CARD</Link>
                                                    <div className="col-sm-9">
                                                        <div className="card card-dashboard">
                                                            <div className="card-body">

                                                                {customerCard.length > 0
                                                                    ? <CardComponent cards={customerCard} />
                                                                    : <p>You Haven’t Saved Any Cards Yet<br /></p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                </TabPanel>
                                            </div>
                                        </div>
                                    </div>
                                </Tabs>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <AddressModal address={address} onAddressSubmit={onSubmitAddressData} />
            <AddAddressModal />
            <CardModal onCardSubmit={onSubmitCardForm} />
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchUser: (userInfo) => dispatch(fetchUser(userInfo)),
        showModal: (model) => dispatch(showModal(model)),
        closeModal: (model) => dispatch(closeModal(model))
    }
}

export default connect(null, mapDispatchToProps)(React.memo(MyAccount));