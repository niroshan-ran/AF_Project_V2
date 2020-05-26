import {
    ADD_TO_CART_USER,
    AUTH_ERROR, AUTH_USER,
    LOAD_SM,
    LOAD_USER,
    LOG_OUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from '../constants/constants';

import axios from 'axios';

import {setToken} from "../setToken";


export const loadUser1 = () => {

    if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
    }

    const response = axios.get('http://localhost:4001/api/users');

    return response;

}

export const loadUser = () => async dispatch => {

    if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
    }

    try{
        const response = await axios.get('http://localhost:4001/api/users');

        const position = response.data.position;
        //console.log(position);

        dispatch({
            type:LOAD_USER,
            payload:response.data,
        })



    }catch (e) {

        dispatch({
            type:AUTH_ERROR,
            payload: e
        })
    }

}


export const loadSM = () => async dispatch => {

    if(localStorage.getItem('token')){

        setToken(localStorage.getItem('token'));

    }

    try{
        const response = await axios.get('http://localhost:4001/api/store_manager');

        dispatch({
            type:LOAD_SM,
            payload:response.data
        })

    }catch (e) {

        dispatch({
            type:AUTH_ERROR,
            payload: e
        })

    }

}

export const registerUser = (firstName, lastName, email, password) => async dispatch => {

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({firstName, lastName,  email, password})
        const response = await axios.post('http://localhost:4001/api/users/register',body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        })

        dispatch(loadUser());

    }catch (e) {

        dispatch({
            type:REGISTER_FAIL,
            payload: e
        })
    }
}

export const registerSM = (firstName, lastName, position, email, password) => async dispatch => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({firstName, lastName, position, email, password})
        const response = await axios.post('http://localhost:4001/api/store_manager/sm_register',body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        })

        dispatch(loadSM());

    }catch (e) {
        dispatch({
            type:REGISTER_FAIL,
            payload: e
        })
    }

}



export const loginUser = (email, password) => async dispatch => {

    try {

        const config = {

            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({email, password})
        const response1 = await axios.post('http://localhost:4001/api/users/login', body, config);
            //.then(res => console.log(res.data));
        //console.log("position: "+response1.data[1]);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response1.data,
        })

        dispatch(loadUser());

    } catch (e) {

        dispatch({
            type: LOGIN_FAIL,
            payload: e
        })
    }
}

//position

export const getPosition = () => async dispatch => {

    if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
    }

    try{
        const response = await axios.get('http://localhost:4001/api/users')
            .then(res => console.log(res.data.position));
        dispatch({
            type:LOAD_USER,
            payload:response.data

        })

    }catch (e) {

        dispatch({
            type:AUTH_ERROR,
            payload: e
        })
    }
}


export const loginSM = (email, password) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }

        }
        const body = JSON.stringify({email, password})
        const response2 = await axios.post('http://localhost:4001/api/store_manager/sm_login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response2.data
        })
        dispatch(loadSM());

    } catch (e) {
        dispatch({
            type: LOGIN_FAIL,
            payload: e
        })
    }
};

export function addToCart(_id){
    const request = axios.post(`http://localhost:4001/api/cart/addToCart?productId=${_id}`)
        .then(response => response.data);

    return{
        type: ADD_TO_CART_USER,
        playload:request
    }
}

export function auth() {
    const request = axios.get(`http://localhost:4001/api/cart/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}


/*export const loginSM = (email, password) => async dispatch => {

    try{

        const config = {

            headers: {

                'Content-Type': 'application/json'

            }

        }

        const body = JSON.stringify({email, password})

        const response = await axios.post('http://localhost:4001/api/store_manager/sm_login',body,config);



        dispatch({

            type:LOGIN_SUCCESS,

            payload:response.data

        })



        dispatch(loadSM());



    }catch (e) {

        dispatch({

            type:LOGIN_FAIL,

            payload: e

        })

    }

}

*/

export const logOut = () => async dispatch =>{
    dispatch({
        type:LOG_OUT,
    })
}