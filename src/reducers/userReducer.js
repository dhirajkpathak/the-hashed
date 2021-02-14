import * as types from '../constants/action-types';

const defaultState = {
    loggedIn: false,
    user: {}
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
