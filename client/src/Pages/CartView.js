import React, {useEffect, useState} from "react";
//import {connect} from "react-redux";
import {loginUser} from "../action/auth";
//import { Redirect } from "react-router-dom";
import LogedinHeader from "./LogedInHeader";
import '../CSS/CartView.css';
import axios from 'axios';
import Fab from "@material-ui/core/Fab";
import {useHistory} from "react-router-dom";

import "./Components/AlertStyles.css";


let CartView = (props) => {


    let [products, setProducts] = useState([]);
    let [user, setUser] = useState(loginUser)
    let [userID, setUserID] = useState('');
    let [myCart, setMyCart] = useState([]);
    let [totQuantity, setTotQuantity] = useState(0);


    let addToCarthandler = (product) => {
        console.log('It from add to cart' + props.match.params.user)
        setUserID(props.match.params.user);
        setMyCart([...myCart, product]);
        setTotQuantity(totQuantity + 1);

    }


    useEffect(() => {
        setUserID(props.match.params.user);
        console.log("This is user id :" + props.match.params.user);

        axios.get('http://localhost:4001/cart/')
            .then(response => {
                setProducts(response.data);

            })
            .catch(error => {
                console.log(error);
            })

    }, []);


    let productList = () => {
        return products.map((product, i) => (
            <div className="col-sm-6 col-md-4 mb-3" key={i}>
                <div className="img-thumbnail">
                    <img src={product.PImage} className="img-responsive" alt="logo"/>
                    <div className="figure-caption ml-3">
                        <h3>{product.PName}</h3>
                        <p>{product.PDescription}</p>
                        <div className="clearfix">
                            <div className="pull-left"
                                 style={{fontWeight: "bold", fontSize: "16px"}}>Rs {product.PPrice}</div>
                            <p className="pull-right"><a onClick={() => addToCarthandler(product)}
                                                         className="btn btn-success" role="button">Add To Cart</a>
                                <a href="#" className="btn btn-info" role="button">Wish List</a></p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }


    const history = useHistory();

    const viewCart = () => {
        console.log('this is from view cart redirect');
        let path = `/MyCart`;
        history.push({
            pathname: path,
            state: {
                userID: userID,
                myCart: myCart,
                totQuantity: totQuantity
            }
        });
    }

    return (
        <div>
            <LogedinHeader myCart={myCart} totQuantity={totQuantity}
                           userID={userID}/>
            <div className="container">
                <div className="row">
                    {productList()}
                </div>
            </div>

            <Fab color="primary" aria-label="add" id="myBtn2" onClick={viewCart}>
                <i className="fa fa-shopping-cart fa-2x"/>
                <span className="badge-success badge-pill">{totQuantity}</span>
                <span className="sr-only">(current)</span>
            </Fab>
        </div>
    );


}

export default CartView;
