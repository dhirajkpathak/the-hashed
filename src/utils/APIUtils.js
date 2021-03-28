import { API_BASE_URL, ACCESS_TOKEN } from '../constants/api-constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfileDetails() {

    return localStorage.getItem("USER_PROFILE");
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/login/user",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/signup/user",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getAddress() {
    return request({
        url: API_BASE_URL + "/hashedApi/accountAddress",
        method: 'GET',
    });
}

export function getProfileDetails() {
    return request({
        url: API_BASE_URL + "/hashedApi/account",
        method: 'GET',
    });
}

export function updateAddress(addressData) {
    return request({
        url: API_BASE_URL + "/hashedApi/updateAccountAddress",
        method: 'POST',
        body: JSON.stringify(addressData)
    });
}

export function addAddress(addressData) {
    return request({
        url: API_BASE_URL + "/hashedApi/addCustomerAddress",
        method: 'POST',
        body: JSON.stringify(addressData)
    });
}

export function updateAccountDetails(profiledata) {
    return request({
        url: API_BASE_URL + "/hashedApi/accountSummary",
        method: 'POST',
        body: JSON.stringify(profiledata)
    });
}

export function getSavedCard() {
    return request({
        url: API_BASE_URL + "/hashedApi/customerCard",
        method: 'GET',
    });
}

export function addCustomerCard(profiledata) {
    return request({
        url: API_BASE_URL + "/hashedApi/addCustomerCard",
        method: 'POST',
        body: JSON.stringify(profiledata)
    });
}

//Cart API
export function addItemToCart(cartItems) {
    return request({
        url: API_BASE_URL + "/hashedApi/addCart",
        method: 'POST',
        body: JSON.stringify(cartItems)
    });
}

export function getCartCount() {
    return request({
        url: API_BASE_URL + "/hashedApi/countCartQuantity",
        method: 'GET',
    });
}

export function getCartDetails() {
    return request({
        url: API_BASE_URL + "/hashedApi/cartDetails",
        method: 'GET',
    });
}

export function removeItemFromCart(cartId) {
    return request({
        url: API_BASE_URL + "/hashedApi/deleteCart?cartId=" + cartId,
        method: 'DELETE'
    });
}
//Product API
export function getLatestProduct() {
    return request({
        url: API_BASE_URL + "/hashedApi/latestProducts",
        method: 'GET',
    });
}