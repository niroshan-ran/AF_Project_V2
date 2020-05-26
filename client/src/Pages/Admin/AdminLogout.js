import React from "react";
import {connect} from "react-redux";
import {logOut} from "../../action/auth";
//import { Redirect } from "react-router-dom";




const AdminLogout = ({isLoggedIn,logOut}) => {

    return (
        <div>
                <h1>Admin Logout</h1>
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
                                {window.location="/"}
                            </div>
                        )
                }

        </div>
    );
}


const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps,{ logOut})(AdminLogout);