import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { addAddress } from '../../../utils/APIUtils';

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

function AddAddressModal(props) {
    const { showModal, modal } = props;
    // console.log("add-address from props: ", props);

    // const [userAddress, setUserAddress] = useState(address);
    // const { id, firstName, lastName, companyName, address1, address2, city, country, region, zipCode, mobileNo } = address;
    let timer;

    function closeModal() {
        document.getElementById("add-address-modal").classList.remove("ReactModal__Content--after-open");

        timer = setTimeout(() => {
            props.closeModal('add-address');
        }, 200);
    }

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    })

    const [values, setValues] = useState({});

    // console.log("add-address values state props: ", values);


    const handleChange = (e) => {

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

    };

    const { register, handleSubmit, errors } = useForm();

    const onSubmitAddressData = (data, e) => {

        // data['id'] = id;
        // data['currency'] = '1';
        // console.log("Data: ", data);
        addAddress(data)
            .then(response => {

                // console.log("Response: ", response);
                closeModal();
                // localStorage.setItem(ACCESS_TOKEN, response.token);
                // Alert.success("You're successfully logged in!");
                // this.props.history.push("/");
                // redirectLogin();

            }).catch(error => {
                console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    };

    return (
        <Modal
            isOpen={showModal && 'add-address' === modal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Add Address Modal"
            className="modal-dialog modal-dialog-centered"
            id="add-address-modal" >
            <div className="modal-content">
                <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                        <span aria-hidden="true"><i className="icon-close"></i></span>
                    </button>
                    <div className="form-box">
                        <div className="form-tab">
                            <Tabs selectedTabClassName="show" defaultIndex={0}>
                                <TabList className="nav nav-pills nav-fill">

                                    <Tab className="nav-item">
                                        <span className="nav-link">Edit Address</span>
                                    </Tab>
                                </TabList>

                                <div className="tab-content">

                                    <TabPanel>

                                        <form onSubmit={handleSubmit(onSubmitAddressData)}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="first-name">First Name *</label>
                                                    <input type="text" className="form-control" id="first-name" name="firstName" defaultValue={values.firstName} ref={register({ required: true })} onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="last-name">Last Name *</label>
                                                    <input type="text" className="form-control" id="last-name" name="lastName" defaultValue={values.lastName} ref={register({ required: true })} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="company-name">Company Name *</label>
                                                <input type="text" className="form-control" id="company-name" name="companyName" defaultValue={values.companyName} ref={register({ required: true })} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="address-line1">Address *</label>
                                                <input type="text" className="form-control" id="address-line1" name="address1" defaultValue={values.address1} ref={register({ required: true })} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="address-line2">Address-Line 2*</label>
                                                <input type="text" className="form-control" id="address-line2" name="address2" defaultValue={values.address2} ref={register({ required: true })} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="city-name">City *</label>
                                                <input type="text" className="form-control" id="city-name" name="city" defaultValue={values.city} ref={register({ required: true })} onChange={handleChange} />
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="country-name">Country *</label>
                                                    <input type="text" className="form-control" id="country-name" name="country" defaultValue={values.country} ref={register({ required: true })} onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="region-name">Region *</label>
                                                    <input type="text" className="form-control" id="region-name" name="region" defaultValue={values.region} ref={register({ required: true })} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputZip">Zip</label>
                                                    <input type="text" className="form-control" name="zipCode" defaultValue={values.zipCode} id="inputZip" onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="register-mobile">Mobile *</label>
                                                    <input type="text" className="form-control" id="register-mobile" name="mobileNo" defaultValue={values.mobileNo} ref={register({ required: true })} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                                    <label className="form-check-label" htmlFor="gridCheck">
                                                        Make this my default address
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

function mapStateToProps(state) {
    return {
        showModal: state.modal.showModal,
        modal: state.modal.modal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchUser: (userInfo) => dispatch(fetchUser(userInfo)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressModal);