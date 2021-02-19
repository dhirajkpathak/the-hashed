import * as types from '../constants/action-types';
import { closeModal } from '../actions';
import { login, signup, getProfileDetails } from '../utils/APIUtils';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, ACCESS_TOKEN, USER_INFO } from '../constants/api-constants';

const setUser = (payload) => ({ type: types.SET_USER, payload })

const logUserOut = () => ({ type: types.LOG_OUT })

// const setUserProfile = () => ({})

// Methods

export const fetchUser = (userInfo, modal) => dispatch => {

    login(userInfo)
        .then(response => {

            console.log("Response: ", response);
            localStorage.setItem(ACCESS_TOKEN, response.token);
            // localStorage.setItem("USER_PROFILE", response.user_profile_details)
            // dispatch(setUser(response.user_profile_details))
            // setUserProfile();
            getProfileDetails()
                .then(res => {

                    localStorage.setItem(USER_INFO, JSON.stringify(res))
                    dispatch(setUser(res))
                }).catch(error => {
                    console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
            console.log("Login successful");
            dispatch(closeModal(modal))
            // this.props.history.push("/");
        }).catch(error => {
            console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });

    // fetch(`http://localhost:4000/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //     },
    //     body: JSON.stringify(userInfo)
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         // data sent back will in the format of
    //         // {
    //         //     user: {},
    //         //.    token: "aaaaa.bbbbb.bbbbb"
    //         // }
    //         localStorage.setItem("token", data.token)
    //         dispatch(setUser(data.user))
    //     })
}

export const signUserUp = (userInfo) => dispatch => {
    fetch(`http://localhost:4000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => res.json())
        .then(data => {
            // data sent back will in the format of
            // {
            //     user: {},
            //.    token: "aaaaa.bbbbb.bbbbb"
            // }
            localStorage.setItem("token", data.token)
            dispatch(setUser(data.user))
        })
}

export const setUserProfile = () => dispatch => {

    getProfileDetails()
        .then(response => {

            console.log("Response154: ", response);
            // localStorage.setItem(ACCESS_TOKEN, response.token);
            // localStorage.setItem(USER_INFO, response)
            localStorage.setItem(USER_INFO, JSON.stringify(response))
            dispatch(setUser(response))
            console.log("profile has been set");
            // dispatch(closeModal(modal))
            // this.props.history.push("/");
        }).catch(error => {
            console.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
}

export const removeUser = () => dispatch => {

    localStorage.clear();
    dispatch(logUserOut());
}

// export const autoLogin = () => dispatch => {
//     fetch(`http://localhost:4000/auto_login`, {
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem("token")}`
//         }
//     })
//     .then(res => res.json())
//     .then(data => {
//         // data sent back will in the format of
//         // {
//         //     user: {},
//         //.    token: "aaaaa.bbbbb.bbbbb"
//         // }
//         localStorage.setItem("token", data.token)
//         dispatch(setUser(data.user))
//     })
// }