import * as types from '../constants/action-types';
import { ACCESS_TOKEN, USER_INFO } from '../constants/api-constants';

// const defaultState = {
//     loggedIn: isUserLoggedIn(),
//     user: getUsersDetails()
// }

function getUsersDetails() {

    const user = JSON.parse(localStorage.getItem(USER_INFO));
    return user;
}

const defaultState = {
    loggedIn: false,
    user: {}
}

function isUserLoggedIn() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return false;
    } else {
        return true;
    }
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case types.SET_USER:
            return {
                loggedIn: true,
                user: {...action.payload}
            }
        case types.LOG_OUT:
            return {
                loggedIn: false,
                user: {}
            }
        default: return state
    }
}

export default userReducer
