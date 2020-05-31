import {
    ADD_TO_CART_USER,
    AUTH_ERROR,
    LOAD_USER,
    LOG_OUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './constants/constants';

const initialState = {
    token: localStorage.getItem('token'),
    isLoggedIn: false,
    errors: {}
}

const authReducer = (state = initialState,action) => {
    const { type,payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                isLoggedIn: true
            };
        case LOAD_USER:
            localStorage.getItem('token');
            return {
                ...state,
                isLoggedIn: true
            }
        case ADD_TO_CART_USER:
            return {...state,userData:{
                    ...state.userData,
                    cart: action.playload
                }
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
            return {
                ...state,
                isLoggedIn: false,
                errors: payload
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default authReducer;