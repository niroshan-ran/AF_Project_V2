import React, {useState} from "react";
import {loadUser1, loginUser} from "../action/auth";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import '../CSS/login.css';
import Header from "./Header";
import Swal from "sweetalert2";
//import Register from "./Register";


const Login = ({loginUser, isLoggedIn}) => {

    const loggedAlert = ()=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'You have successfully logged in',
            showConfirmButton: false,
            timer: 3000
        })
    }

    let [data, setData] = useState({
        email: '',
        password: ''
    });

    let [user, setUser] = useState({
        position: '',
        userId:''
    })


    let {email, password} = data;


    if (isLoggedIn) {
        // loggedAlert();

        loadUser1().then((res) => {
            setUser({
                position: res.data.position,
                userId: res.data._id
            })



        });


        switch (user.position) {
            case 'admin':
                return <Redirect to="/admin"/>
            case 'sm':
                return <Redirect to="/admin"/>
            case 'user':
                if (!localStorage.getItem('userType')) {
                    localStorage.setItem('userType', user.position);
                }

                if (!localStorage.getItem('userId')) {
                    localStorage.setItem('userId', user.userId);
                }
                return <Redirect to={"/CartView/" + localStorage.getItem('userId')}/>
        }



    }

    const fieldmissAlart = ()=>{
        Swal.fire({
            icon: 'question',
            title: 'Oppss! something missing',
            text: 'Please enter user name and password!'
        })
    }


    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    };

    const submitData = () => {

        if(email==="" ||password===""){
            fieldmissAlart();
        }else{
            loginUser(email, password);
        }

    };


    return (
        <div>
            <Header/>
            <div className="container">

                <div className="whole-page">
                    <div className="parent-heading-1 col-md-auto">
                        <div className="heading1">
                            <p>LOGIN</p>
                        </div>
                    </div>

                    <div className="login_form ">
                        <div className="form-group-1">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   onChange={(e) => onChange(e)}
                                   value={email}
                                   name="email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone
                                else.</small>
                        </div>
                        <div className="form-group-1">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password"
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   onChange={(e) => onChange(e)}
                                   value={password}
                                   name="password"/>
                        </div>

                        <button type="button" className="btn btn-info">
                            <a className="register-anchor" href="/register">Register</a>
                        </button>

                        <button type="submit"
                                className="btn btn-primary"
                                onClick={() => submitData()}>Submit
                        </button>


                        <br/>
                        <br/>
                    </div>
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {loginUser})(Login);