import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { closeModal } from '../../../actions';

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
    // console.log("add from props: ", props);

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

    const [values, setValues] = useState({ ...address });

    useEffect(() => {
        setValues({
            ...address
        })
    }, [address])

    const { register, handleSubmit, errors } = useForm();

    const handleAddressSubmit = (data, e) => {

        props.onAddressSubmit(data, e);
    }

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

                            <h5 className="text-center">Edit Address</h5>
                            <hr />

                            <div className="tab-content">
                                <form onSubmit={handleSubmit(handleAddressSubmit)}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="first-name">First Name *</label> */}
                                            <input type="text" placeholder="First Name *" className="form-control" id="first-name" name="firstName" ref={register({ required: true })} defaultValue={values.firstName} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="last-name">Last Name *</label> */}
                                            <input type="text" placeholder="Last Name *" className="form-control" id="last-name" name="lastName" ref={register({ required: true })} defaultValue={values.lastName} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        {/* <label htmlFor="company-name">Company Name *</label> */}
                                        <input type="text" placeholder="Company Name *" className="form-control" id="company-name" name="companyName" ref={register({ required: true })} defaultValue={values.companyName} />
                                    </div>

                                    <div className="form-group">
                                        {/* <label htmlFor="address-line1">Address *</label> */}
                                        <input type="text" placeholder="Address *" className="form-control" id="address-line1" name="address1" ref={register({ required: true })} defaultValue={values.address1} />
                                    </div>

                                    <div className="form-group">
                                        {/* <label htmlFor="address-line2">Address-Line 2*</label> */}
                                        <input type="text" placeholder="Address-Line 2" className="form-control" id="address-line2" name="address2" ref={register({ required: true })} defaultValue={values.address2} />
                                    </div>

                                    <div className="form-group">
                                        {/* <label htmlFor="city-name">City *</label> */}
                                        <input type="text" placeholder="City *" className="form-control" id="city-name" name="city" ref={register({ required: true })} defaultValue={values.city} />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="country-name">Country *</label> */}
                                            <input type="text" placeholder="Country *" className="form-control" id="country-name" name="country" ref={register({ required: true })} defaultValue={values.country} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="region-name">Region *</label> */}
                                            <input type="text" placeholder="Region *" className="form-control" id="region-name" name="region" ref={register({ required: true })} defaultValue={values.region} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="inputZip">Zip</label> */}
                                            <input type="text" placeholder="Zip *" className="form-control" name="zipCode" id="inputZip" defaultValue={values.zipCode} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            {/* <label htmlFor="register-mobile">Mobile *</label> */}
                                            <input type="text" placeholder="Mobile *" className="form-control" id="register-mobile" name="mobileNo" ref={register({ required: true })} defaultValue={values.mobileNo} />
                                        </div>
                                    </div>
                                    <div className="form-row d-flex justify-content-between">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" name="isDefault" ref={register} defaultChecked={values.isDefault} type="checkbox" id="defaultAdd" />
                                                <label className="form-check-label" htmlFor="defaultAdd">
                                                    Make this my default address
                                                    </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" name="isShippingAddress" ref={register} defaultChecked={values.isShippingAddress} type="checkbox" id="shippingadd" />
                                                <label className="form-check-label" htmlFor="shippingadd">
                                                    Make this my shipping address
                                                    </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
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