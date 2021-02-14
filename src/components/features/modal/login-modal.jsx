import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, ACCESS_TOKEN } from '../../../constants/api-constants';
import { login, signup } from '../../../utils/APIUtils';

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

function LoginModal(props) {
    const { showModal, modal } = props;
    let timer;

    function closeModal() {
        document.getElementById("login-modal").classList.remove("ReactModal__Content--after-open");

        timer = setTimeout(() => {
            props.closeModal('login');
        }, 200);
    }

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    })

    const { register, handleSubmit, errors } = useForm();
    const onSubmitLoginData = (data, e) => {
        console.log(data);
        // login(data)
        //     .then(response => {

        //         console.log("Response: ", response);
        //         localStorage.setItem(ACCESS_TOKEN, response.token);
        //         localStorage.setItem("CURRENT_USER_NAME", response.user_profile_details.firstname)
        //         console.log("Login successful");
        //         // this.props.history.push("/");
        //     }).catch(error => {
        //         console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        //     });
        props.fetchUser(data, props.modal);
    };

    const [defaultIndex, setDefaultIndex] = useState(0);
    const onSubmitSignupData = (data, e) => {

        data['accounttype'] = 'WEB';
        data['currency'] = 'INR';
        console.log(data);
        signup(data)
            .then(response => {

                console.log("Response: ", response);
                // localStorage.setItem(ACCESS_TOKEN, response.token);
                // Alert.success("You're successfully logged in!");
                // this.props.history.push("/");
                // redirectLogin();
                setDefaultIndex(0);

            }).catch(error => {
                console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    };

    return (
        <Modal
            isOpen={showModal && 'login' === modal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Login Modal"
            className="modal-dialog modal-dialog-centered"
            id="login-modal" >
            <div className="modal-content">
                <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                        <span aria-hidden="true"><i className="icon-close"></i></span>
                    </button>
                    <div className="form-box">
                        <div className="form-tab">
                            <Tabs selectedTabClassName="show" selectedIndex={defaultIndex} onSelect={index => setDefaultIndex(index)}>
                                <TabList className="nav nav-pills nav-fill">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Sign In</span>
                                    </Tab>

                                    <Tab className="nav-item">
                                        <span className="nav-link">Register</span>
                                    </Tab>
                                </TabList>

                                <div className="tab-content">
                                    <TabPanel style={{ paddingTop: "2rem" }}>
                                        <div>
                                            <form action="#" onSubmit={handleSubmit(onSubmitLoginData)}>
                                                <div className="form-group">
                                                    <label htmlFor="singin-email-2">Email *</label>
                                                    <input type="email" className="form-control" id="singin-email-2" name="username" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="singin-password-2">Password *</label>
                                                    <input type="password" className="form-control" id="singin-password-2" name="password" ref={register({ required: true, minLength: 8, maxLength: 16 })} />
                                                </div>

                                                <div className="form-footer">
                                                    <button type="submit" className="btn btn-outline-primary-2">
                                                        <span>LOG IN</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>

                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="signin-remember-2" />
                                                        <label className="custom-control-label" htmlFor="signin-remember-2">Remember Me</label>
                                                    </div>

                                                    <Link to="#" className="forgot-link">Forgot Your Password?</Link>
                                                </div>
                                            </form>
                                            <div className="form-choice">
                                                <p className="text-center">or sign in with</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <a className="btn btn-login btn-g" href={GOOGLE_AUTH_URL} target="_blank">
                                                            <i className="icon-google"></i>
                                                        Login With Google
                                                    </a>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <a to="#" className="btn btn-login btn-f" href={FACEBOOK_AUTH_URL} target="_blank">
                                                            <i className="icon-facebook-f"></i>
                                                            Login With Facebook
                                                    </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>

                                    <TabPanel>
                                        <form action="#" onSubmit={handleSubmit(onSubmitSignupData)}>
                                            <div className="form-group">
                                                <label htmlFor="register-firstname">First Name *</label>
                                                <input type="text" className="form-control" id="register-firstname" name="firstname" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-lastname">Last Name *</label>
                                                <input type="text" className="form-control" id="register-lastname" name="lastname" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-email-2">Your email address *</label>
                                                <input type="email" className="form-control" id="register-email-2" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-mobile">Mobile *</label>
                                                <input type="text" className="form-control" id="register-mobile" name="mobile" ref={register({ required: true })} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-password-2">Password *</label>
                                                <input type="password" className="form-control" id="register-password-2" name="password" ref={register({ required: true, minLength: 8, maxLength: 16 })} />
                                            </div>

                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-outline-primary-2">
                                                    <span>SIGN UP</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </button>

                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="register-policy-2" required />
                                                    <label className="custom-control-label" htmlFor="register-policy-2">I agree to the <Link to="#">privacy policy</Link> *</label>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="form-choice">
                                            <p className="text-center">or sign in with</p>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a className="btn btn-login btn-g" href={GOOGLE_AUTH_URL} target="_blank">
                                                        <i className="icon-google"></i>
                                                        Login With Google
                                                    </a>
                                                </div>
                                                <div className="col-sm-6">
                                                    <a to="#" className="btn btn-login btn-f" href={FACEBOOK_AUTH_URL} target="_blank">
                                                        <i className="icon-facebook-f"></i>
                                                            Login With Facebook
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
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
        fetchUser: (userInfo) => dispatch(fetchUser(userInfo)),
        closeModal: (model) => dispatch(closeModal(model))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);