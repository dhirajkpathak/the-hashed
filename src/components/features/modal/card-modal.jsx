import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { updateAddress } from '../../../utils/APIUtils';

import { closeModal } from '../../../actions';
import { fetchUser } from '../../../actions/userActions';

const customStyles = {
    content: {
        top: '50%',
        transform: 'translateY(-50%)'
    },
    overlay: {
        backgroundColor: 'rgba(77,77,77,0.6)',
        zIndex: '10000'
    }
};

Modal.setAppElement('#root');

function CardModal(props) {
    const { showModal, modal } = props;
    console.log("card props: ", props);


    function closeModal() {
        document.getElementById("card-modal").classList.remove("ReactModal__Content--after-open");
        props.closeModal('card');
    }

    // const [values, setValues] = useState({ ...address });

    // console.log("values state props: ", values);


    // const handleChange = (e) => {

    //     const { name, value } = e.target;
    //     setValues({
    //         ...values,
    //         [name]: value,
    //     });

    // };
    // console.log("first name: ", values.firstName);

    // const name = values['firstName'];
    const { register, handleSubmit, errors } = useForm();

    const handleCardSubmit = (data, e) => {

        props.onCardSubmit(data, e);
    }

    return (
        <Modal
            isOpen={showModal && 'card' === modal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Card Modal"
            className="modal-dialog modal-dialog-centered"
            id="card-modal" >
            <div className="modal-content">
                <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                        <span aria-hidden="true"><i className="icon-close"></i></span>
                    </button>
                    <div className="form-box">
                        <div className="form-tab">
                            {/* <Tabs selectedTabClassName="show" defaultIndex={0}>
                                <TabList className="nav nav-pills nav-fill">

                                    <Tab className="nav-item">
                                        <span className="nav-link">Add Card</span>
                                    </Tab>
                                </TabList> */}
                            <h5 className="text-center">Add Card</h5>
                            <hr />

                            <div className="tab-content">

                                {/* <TabPanel> */}
                                <form onSubmit={handleSubmit(handleCardSubmit)}>

                                    <div className="form-row">
                                        <div className="form-group col-md-8">
                                            {/* <label htmlFor="card-number">Card Number *</label> */}
                                            <input type="text" placeholder="Card Number *" className="form-control" id="card-number" name="cardNo" ref={register({ required: true })} defaultValue={""} />
                                        </div>

                                        <div className="form-group col-md-4">
                                            {/* <label htmlFor="card-cvv">CVV *</label> */}
                                            <input type="number" placeholder="CVV *" className="form-control" id="card-cvv" name="cvv" ref={register({ required: true })} defaultValue={""} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-8">
                                            {/* <label htmlFor="customer-name">Name on Card *</label> */}
                                            <input type="text" placeholder="Name On Card *" className="form-control" id="customer-name" name="customerName" ref={register({ required: true })} defaultValue={""} />
                                        </div>

                                        <div className="form-group col-md-4">
                                            {/* <label htmlFor="expiry-date">Valid thru *</label> */}
                                            <input type="text" placeholder="Valid thru *" className="form-control" id="expiry-date" name="expiryDate" ref={register({ required: true })} defaultValue={""} />
                                        </div>
                                    </div>

                                    <h6 className="text-center">Billing Address</h6>
                                    <hr />

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="first-name">First Name *</label> */}
                                            <input type="text" placeholder="First Name *" className="form-control" id="first-name" name="firstName" ref={register({ required: true })} defaultValue={""} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="last-name">Last Name *</label> */}
                                            <input type="text" placeholder="Last Name *" className="form-control" id="last-name" name="lastName" ref={register({ required: true })} defaultValue={""} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        {/* <label htmlFor="company-name">Company Name *</label> */}
                                        <input type="text" placeholder="Company Name *" className="form-control" id="company-name" name="companyName" ref={register({ required: true })} defaultValue={""} />
                                    </div>

                                    <div className="form-group">
                                        {/* <label htmlFor="address-line1">Address *</label> */}
                                        <input type="text" placeholder="Address *" className="form-control" id="address-line1" name="address1" ref={register({ required: true })} defaultValue={""} />
                                    </div>

                                    <div className="form-group">
                                        {/* <label htmlFor="address-line2">Address-Line 2*</label> */}
                                        <input type="text" placeholder="Address-Line 2" className="form-control" id="address-line2" name="address2" ref={register({ required: true })} defaultValue={""} />
                                    </div>

                                    <div className="form-group">
                                        {/* <label htmlFor="city-name">City *</label> */}
                                        <input type="text" placeholder="City *" className="form-control" id="city-name" name="city" ref={register({ required: true })} defaultValue={""} />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="country-name">Country *</label> */}
                                            <input type="text" placeholder="Country *" className="form-control" id="country-name" name="country" ref={register({ required: true })} defaultValue={""} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="region-name">Region *</label> */}
                                            <input type="text" placeholder="Region *" className="form-control" id="region-name" name="region" ref={register({ required: true })} defaultValue={""} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="inputZip">Zip</label> */}
                                            <input type="text" placeholder="Zip *" className="form-control" name="zipCode" id="inputZip" defaultValue={""} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="register-mobile">Mobile *</label> */}
                                            <input type="text" placeholder="Mobile *" className="form-control" id="register-mobile" name="mobileNo" ref={register({ required: true })} defaultValue={""} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                                {/* </TabPanel> */}
                            </div>
                            {/* </Tabs> */}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

function mapStateToProps(state, ownProps) {
    // console.log("map state to props state: ", state);
    // console.log("map state to props ownprops: ", ownProps);

    return {
        showModal: state.modal.showModal,
        modal: state.modal.modal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchUser: (userInfo) => dispatch(fetchUser(userInfo)),
        closeModal: (model) => dispatch(closeModal(model))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);