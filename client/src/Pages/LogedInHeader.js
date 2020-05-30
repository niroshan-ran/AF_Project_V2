import React from "react";
import '../CSS/header.css';
import {logOut} from "../action/auth";
import logo from '../Images/logo.jpg';
import 'font-awesome/css/font-awesome.css';
import {connect} from "react-redux";
import {Link, Redirect,useHistory } from "react-router-dom";


const LogedinHeader = ({isLoggedIn,logOut,myCart,totQuantity,userID}) => {

    const history =  useHistory();

    const viewCart =() =>{
        console.log('this is from view cart redirect');
        let path = `/MyCart`;
        history.push({
            pathname:path,
            state:{
                userID:userID,
                myCart:myCart,
                totQuantity:totQuantity
            }
        });
    }
    console.log('from header');
    console.log(myCart);

    return (
        isLoggedIn ? (
        <div className="container-parent2">

            <div className="container-child">
                <img src={logo}
                     alt="logo"/>
            </div>

            <div className="nav-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Titans Online Fashion Store</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">

                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Category
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/">Trousers</a>
                                    <a className="dropdown-item" href="/">T-Shirt</a>
                                    <a className="dropdown-item" href="/">Shorts</a>
                                    <a className="dropdown-item" href="/">Shoes</a>
                                    <div className="dropdown-divider"/>
                                    <a className="dropdown-item" href="/">Cosmetics</a>
                                    <a className="dropdown-item" href="/">Blouses</a>
                                    <a className="dropdown-item" href="/">Frocks</a>
                                    <a className="dropdown-item" href="/">Skirts</a>
                                    <a className="dropdown-item" href="/">Trouser-Female</a>
                                    <a className="dropdown-item" href="/">Shoes</a>
                                </div>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link" href="/feedback">Feedback</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/contact-us">Contact-us <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>

                        <ul className="navbar-nav navbar-right">
                                <li className="nav-item active"  onClick={viewCart}>
                                <a className="nav-link" ><i className="fa fa-shopping-cart fa-2x" />
                                <span className="badge-success badge-pill">{totQuantity}</span>
                                <span className="sr-only">(current)</span></a>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link" onClick={() => logOut()}><i className="fa fa-user fa-2x" /> Logout <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        </div>
        ):
            (
                <div>
                    <Redirect to="/"></Redirect>
                </div>
            )
    );
}


const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps,{ logOut})(LogedinHeader);
//export default (LogedinHeader);