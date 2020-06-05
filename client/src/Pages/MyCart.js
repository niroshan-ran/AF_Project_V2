import React, {Component} from "react";
import axios from "axios";
import {loadUser1, loginUser, logOut} from "../action/auth";
import logo from "../Images/logo.jpg";
import 'font-awesome/css/font-awesome.css';
import LogedinHeader from "./LogedInHeader";
import Swal from "sweetalert2";


export default class MyCart extends Component {
    constructor(props) {
        super(props);

        this.handleCheckOut = this.handleCheckOut.bind(this);
        this.state = {
            user:loginUser,
            userID:this.props.location.state.userID,
            myCart:this.props.location.state.myCart,
            totQuantity:this.props.location.totQuantity,
            totalAmount:0
        };
        //this.productList = this.productList.bind(this);
        //const prevState = this.props.location.state
    }

    RemoveFromCarthandler = (product) => {
        const filteredItems = this.state.myCart.filter(item => item._id !== product)
        this.setState({
            myCart: filteredItems
        });
    }

    totalQuantity(){
        let Qty = this.state.myCart.length;
        //this.setState({totQuantity:Qty})
        return(<h4>Total Quantity         : {Qty}</h4>);
        console.log(Qty);
    }

    totalAmount(){
        var sum = 0;
        this.state.myCart.forEach(function(obj){
            sum += obj.PPrice;
        });
        //this.setState({totalAmount:sum})
        return(<h4>Total Amount To Pay   : Rs {sum}</h4>);
    }

    confirmAlart(){
        Swal.fire(
            'Thank You!',
            'Checked Out Successfully',
            'success'
        )
    }

    handleCheckOut(e){
        e.preventDefault();
        var sum = 0;
        this.state.myCart.forEach(function(obj){
            sum += obj.PPrice;
        });
        const cart = {
            CUser : this.state.userID,
            CProduct : this.state.myCart,
            CQuantity : this.state.myCart.length,
            CAmount : sum
        }

        console.log(cart);

        axios.post('http://localhost:4001/cart/add', cart)
            .then(res => {
                    console.log(res.data);
                    this.confirmAlart();
                }
            );

    }

    productList(){
        const mystyle = {
            width: "100px",
            height: "150px"
        };
        //return this.props.location.state.myCart.map((product,i) =>(
        return this.state.myCart.map((product,i) =>(
            <div className="d-flex flex-row " key={i}>

                    <img src={product.PImage} className="mh-50" style={mystyle} alt="logo"/>

                    <div className="figure-caption ml-3">
                        <h3>{product.PName}</h3>
                        <h4>Rs {product.PPrice}</h4>
                        <button type="button" className="btn btn-danger" onClick={() => this.RemoveFromCarthandler(product._id)}>Remove From Cart</button>
                        <div className="clearfix">
                        </div>
                    </div>

            </div>
    ));
    }

    render() {
        const hrStyle={border: "1px solid red"}
        return(
            <div>
                <LogedinHeader myCart = {this.state.myCart} totQuantity = {this.state.totQuantity} userID = {this.state.userID}/>
                <div className="container bg-light">
                        {this.productList()}
                        <hr style={hrStyle}/>
                    <div className ="figure-caption pb-5">
                        {this.totalQuantity()}
                        {this.totalAmount()}
                        <button type="button" className="btn btn-success" onClick={this.handleCheckOut}>Check Out</button>
                    </div>
                </div>
            </div>
    );
    }
}