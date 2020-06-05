import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <div className='navi1'>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">Dashboard</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/list" className="nav-link">All Products</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/category" className="nav-link">Create Categories</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/product" className="nav-link">Create Products</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/newOrders" className="nav-link">New Orders</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/cusFeedback" className="nav-link">Customer Feedback</Link>
                            </li>
                            {localStorage.getItem("admin") ?
                                <li className="navbar-item">
                                    <Link to="/sm_register" className="nav-link">Add Store Manager</Link>
                                </li> : <></>}
                            <li className="navbar-item">
                                <Link to="/logout" className="nav-link">logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}
