import React, {useState} from "react";

import { connect} from 'react-redux';

import { registerUser } from "../action/auth";

import {Redirect} from 'react-router-dom';

import '../CSS/registercss/register.css';

import Header from "./Header";



const Register = ({isLoggedIn, registerUser}) => {

    let [data,setData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''

    });

    //nothing is happening here <Redirect/>
    if(isLoggedIn)
        return <Redirect to="/UserPages"/>

    let {firstName, lastName, email, password} = data;
    const onChange = e => {
        setData({...data,[e.target.name]: e.target.value})
    }



    const submitData = () => {
        if(firstName === '' || lastName === '' || email === '' || password ==='') {
            return alert("All the Values are Required");
        }else{
            registerUser(firstName,lastName,email,password);

        }

    }

    return (

        <div>

            <Header/>

            <div className="container">
                <div className="register-parent">
                    <div className="register-heading">
                        <div className="heading2">
                            <p>Register</p>
                        </div>
                    </div>
                    <div className="form-parent">
                        <div className="register_form">
                            <div className="form-group">
                                <label htmlFor="exampleInputFirstName">First Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="exampleInputFirstName"
                                       onChange={(e) => onChange(e)}
                                       value={firstName}
                                       name="firstName"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputLastName">Last Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="exampleInputLastName"
                                       onChange={(e) => onChange(e)}
                                       value={lastName}
                                       name="lastName"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email"
                                       className="form-control"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       onChange={(e) => onChange(e)}
                                       value={email}
                                       name="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="exampleInputPassword1"
                                       onChange={(e) => onChange(e)}
                                       value={password}
                                       name="password"/>
                            </div>
                            <br/>
                            <button type="submit"
                                    className="btn btn-primary"
                                    onClick={() => submitData()}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



const mapStateToProps = state => ({

    isLoggedIn: state.isLoggedIn

})

export default connect(mapStateToProps,{ registerUser })(Register);