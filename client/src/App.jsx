import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import Register from './Pages/Register';
import store from "./store";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {loadUser} from "./action/auth";
import {setToken} from "./setToken";
import UserPages from "./Pages/UserPages";
import AdminPages from "./Pages/Admin/AdminPages";
//import Header from "./Pages/Header";
import Feedback from "./Pages/Feedback";
import ContactUs from "./Pages/ContactUs";
import CartView from "./Pages/CartView";
//import SMLogin from "./Pages/Admin/SMLogin";
//import SMPage from "./Pages/Admin/SMPage";
import AllProduct from "./Pages/AllProduct"
import LandingPage from "./Pages/LandingPage";
import Reducer from './reducers'
import { createStore } from 'redux';
import MyCart from './Pages/MyCart'

const userData = createStore(Reducer);


if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}
const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    },[]);

    return (
        <div className="page-container">

            <div className="content-wrap">

            <Provider store={store}>

                <Router>
                    <Switch>
                        <Route path="/register" component={Register}/>
                        <Route path="/allProduct/:name" component={AllProduct}/>
                        <Route path="/UserPages" component={UserPages}/>
                        <Route path="/admin" component={AdminPages}/>
                        <Route path="/feedback" component={Feedback}/>
                        <Route path="/contact-us" component={ContactUs}/>
                        <Route path="/CartView/:user" component={CartView}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/LandingPage" component={LandingPage}/>
                        <Route path="/MyCart" component={MyCart}/>
                        <Route path="/" component={Dashboard}/>
                    </Switch>
                </Router>
            </Provider>
            </div>

        </div>
    );
}
export default App;
