import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants/api-constants';
import { Redirect } from 'react-router-dom';
import { setUserProfile } from "../../actions/userActions";
import { connect } from 'react-redux';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            console.log("social login token : ", token);
            this.props.setUserProfile();
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserProfile: () => dispatch(setUserProfile())
    }
}

export default connect(null, mapDispatchToProps)(OAuth2RedirectHandler);

// export default OAuth2RedirectHandler;