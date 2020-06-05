import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import RegisterSM from "./add-sm.component";
import Navbar from "./navbar.component";
import ProductList from "./product-list.component";
import EditProduct from "./edit-product.component";
import CreateProduct from "./create-product.component";
import CreateCategory from "./create-category.component";
import Logout from "./AdminLogout";
import NewOrders from "./new-order.component";
import CusFeedback from "./Feedback";
import SMPage from "./SMPage";

function App() {

    if (localStorage.getItem('token')) {

        if (localStorage.getItem('userType')) {
            return <Redirect to={"/"}/>;
        } else {
            return (
                <>

                    <Router>
                        <div className="" style={{background: "white"}}>
                            <Navbar/>

                            <div>
                                <div style={{padding: "20px"}}>
                                    <Route path="/list" exact component={ProductList}/>
                                </div>

                                <div className="container" style={{border: "solid lightgrey 1px"}}>
                                    <Route path="/edit/:id" component={EditProduct}/>
                                    <Route path="/product" component={CreateProduct}/>
                                    <Route path="/category" component={CreateCategory}/>
                                    <Route path="/newOrders" component={NewOrders}/>
                                    <Route path="/sm_pages" component={SMPage}/>
                                    {localStorage.getItem("admin") ?
                                        <Route path="/sm_register" component={RegisterSM}/> : <></>}

                                    <Route path="/logout" component={Logout}/>
                                </div>
                                <div>
                                    <Route path="/cusFeedback" component={CusFeedback}/>
                                </div>

                            </div>
                        </div>
                    </Router>
                    }
                </>
            );

        }
    } else {
        return <Redirect to={"/"}/>;
    }


}

export default App;
