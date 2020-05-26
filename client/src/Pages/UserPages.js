import React from "react";
import {connect} from "react-redux";
import {logOut} from "../action/auth";
import { Redirect } from "react-router-dom";
import Header from "./Header";



const UserPages = ({isLoggedIn,logOut}) => {

    return (
        <div>
            <Header/>
        <div>
            <h1>User Pages</h1>
            {
                isLoggedIn ? (

                        <div>
                            <h1>You are logged in</h1>
                            <br/>

                            <button onClick={() => logOut()}>
                                Log out
                            </button>
                        </div>
                    ) :
                    (
                        <div>
                            <Redirect to="/"></Redirect>
                        </div>
                    )
            }
        </div>
        </div>
    );
}


const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps,{ logOut})(UserPages);