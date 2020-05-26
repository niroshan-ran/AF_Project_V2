import React, {Component} from "react";
//import {connect} from "react-redux";
import {loadUser1, loginUser} from "../action/auth";
//import { Redirect } from "react-router-dom";
import LogedinHeader from "./LogedInHeader";
import logo from '../Images/logo.jpg';
import '../CSS/CartView.css';
import axios from 'axios';
import {addToCart} from '../action/auth';
import {useDispatch} from 'react-redux';


 export default class CartView extends Component{
    constructor(props) {
        super(props);
         this.state = {
             products: [] ,
             user:loginUser,
             userID:''
         };
        this.productList = this.productList.bind(this);
    }

     addToCarthandler(productID){
        console.log(productID);
        const dispatch = useDispatch();
        dispatch(addToCart(productID))
     }


    componentDidMount() {

        loadUser1().then(res => {
            this.setState({
                userID: res.data._id
            })
        })
        console.log(this.state.userID);

        axios.get('http://localhost:4001/cart/')
            .then(response => {
                this.setState({products :response.data})
                //console.log(this.state.products);
            })
            .catch(error => {
                console.log(error);
            })
    }

    productList(){
        return this.state.products.map((product,i) =>(
            <div className="col-sm-6 col-md-4 mb-3" key={i}>
                <div className="img-thumbnail">
                    <img src={product.PImage} className="img-responsive" alt="logo"/>
                    <div className="figure-caption ml-3">
                        <h3>{product.PName}</h3>
                        <p>{product.PDescription}</p>
                        <div className="clearfix">
                            <div className="pull-left" style={{fontWeight:"bold" ,fontSize:"16px"}}>Rs {product.PPrice}</div>
                            <p className="pull-right"><a onClick={() => this.addToCarthandler(product._id)} className="btn btn-success" role="button">Add To Cart</a>
                                <a href="#" className="btn btn-info" role="button">Wish List</a></p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }


    render() {

        return(
            <div>
                <LogedinHeader/>
                    <div className="container">
                        <div className="row">
                            {this.productList()}
                        </div>
                    </div>
            </div>
        );
    }

}