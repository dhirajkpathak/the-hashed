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

function AddressModal(props) {
    const { showModal, modal, address } = props;
    console.log("add from props: ", props);

    // const [userAddress, setUserAddress] = useState(address);
    // const { id, firstName, lastName, companyName, address1, address2, city, country, region, zipCode, mobileNo } = address;
    let timer;

    function closeModal() {
        document.getElementById("address-modal").classList.remove("ReactModal__Content--after-open");

        // timer = setTimeout(() => {
        //     props.closeModal('address');
        // }, 200);
        props.closeModal('address');
    }

    // useEffect(() => {
    //     return () => {
    //         if (timer) clearTimeout(timer);
    //     }
    // })

    const [values, setValues] = useState({...address});

    useEffect(() => {
        setValues({
            ...address
        })
    }, [address])

    console.log("values state props: ", values);


    const handleChange = (e) => {

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

    };
    // console.log("first name: ", values.firstName);
    
    // const name = values['firstName'];
    const { register, handleSubmit, errors } = useForm();

    const handleAddressSubmit = (data, e) => {

        props.onAddressSubmit(data, e);
    }

    // const onSubmitAddressData = (data, e) => {

    //     data['id'] = address.id;
    //     // data['currency'] = '1';
    //     console.log("Data: ", data);
    //     updateAddress(data)
    //         .then(response => {

    //             console.log("Response: ", response);
    //             closeModal();
    //             // localStorage.setItem(ACCESS_TOKEN, response.token);
    //             // Alert.success("You're successfully logged in!");
    //             // this.props.history.push("/");
    //             // redirectLogin();

    //         }).catch(error => {
    //             console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
    //         });
    // };

    return (
        <Modal
            isOpen={showModal && 'address' === modal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Address Modal"
            className="modal-dialog modal-dialog-centered"
            id="address-modal" >
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
                                        {/* <form action="#" onSubmit={handleSubmit(onSubmitAddressData)}>
                                            <div className="form-group">
                                                <label htmlFor="register-firstname">First Name *</label>
                                                <input type="text" className="form-control" id="register-firstname" name="firstName" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-lastname">Last Name *</label>
                                                <input type="text" className="form-control" id="register-lastname" name="lastName" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="company-name">Company Name *</label>
                                                <input type="email" className="form-control" id="company-name" name="companyName" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="address-line1">Address *</label>
                                                <input type="text" className="form-control" id="address-line1" name="address1" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="address-line2">Address-Line 2*</label>
                                                <input type="text" className="form-control" id="address-line2" name="address2" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="city-name">City *</label>
                                                <input type="text" className="form-control" id="city-name" name="city" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="country-name">Country *</label>
                                                <input type="text" className="form-control" id="country-name" name="country" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="region-name">Region *</label>
                                                <input type="text" className="form-control" id="region-name" name="region" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="zip-code">Zip / Postal Code *</label>
                                                <input type="text" className="form-control" id="zip-code" name="zipCode" ref={register({ required: true })} />
                                            </div>

                                            <div class="container">
                                                <div class="row">
                                                    <div class="form-group name1 col-md-2">
                                                        <label for="exampleInputEmail1" class="formText">FIRST NAME:*</label>
                                                        <input type="text" class="form-control" id="name" aria-describedby="emailHelp" name="muverName" />
                                                    </div>

                                                    <div class="form-group name2 col-md-2">
                                                        <label for="exampleInputEmail1## Heading ##" class="formText">LAST NAME:*</label>
                                                        <input type="text" class="form-control" id="name" aria-describedby="emailHelp" name="muverPhone" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-mobile">Mobile *</label>
                                                <input type="text" className="form-control" id="register-mobile" name="mobileNo" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-outline-primary-2">
                                                    <span>Submit</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </button>
                                            </div>
                                        </form> */}
                                        <form onSubmit={handleSubmit(handleAddressSubmit)}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="first-name">First Name *</label>
                                                    <input type="text" className="form-control" id="first-name" name="firstName" ref={register({ required: true })} defaultValue={values.firstName} onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="last-name">Last Name *</label>
                                                    <input type="text" className="form-control" id="last-name" name="lastName" ref={register({ required: true })} defaultValue={values.lastName} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="company-name">Company Name *</label>
                                                <input type="text" className="form-control" id="company-name" name="companyName" ref={register({ required: true })} defaultValue={values.companyName} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="address-line1">Address *</label>
                                                <input type="text" className="form-control" id="address-line1" name="address1" ref={register({ required: true })} defaultValue={values.address1} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="address-line2">Address-Line 2*</label>
                                                <input type="text" className="form-control" id="address-line2" name="address2" ref={register({ required: true })} defaultValue={values.address2} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="city-name">City *</label>
                                                <input type="text" className="form-control" id="city-name" name="city" ref={register({ required: true })} defaultValue={values.city} onChange={handleChange} />
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="country-name">Country *</label>
                                                    <input type="text" className="form-control" id="country-name" name="country" ref={register({ required: true })} defaultValue={values.country} onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="region-name">Region *</label>
                                                    <input type="text" className="form-control" id="region-name" name="region" ref={register({ required: true })} defaultValue={values.region} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputZip">Zip</label>
                                                    <input type="text" className="form-control" name="zipCode" id="inputZip" defaultValue={values.zipCode} onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="register-mobile">Mobile *</label>
                                                    <input type="text" className="form-control" id="register-mobile" name="mobileNo" ref={register({ required: true })} defaultValue={values.mobileNo} onChange={handleChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressModal);