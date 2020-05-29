import React, {useEffect, useState} from 'react'
import axios from 'axios';
import LogedinHeader from "./LogedInHeader";
import {connect, useDispatch} from "react-redux";
import {addToCart, logOut} from "../action/auth";
import {loadUser1, loginUser} from "../action/auth";
import logo from "../Images/logo.jpg";
import {Redirect} from "react-router";
import 'font-awesome/css/font-awesome.css';

function LandingPage(isLoggedIn) {

    let [user, setUser] = useState({
        userID: ''
    })

    const [Products, setProduct] = useState([])
    const [Cart, setCart] = useState({
        product:[],
        user:'',
        totQuantity:0,
        totAmount:0
    })

    useEffect(() => {
        axios.get('http://localhost:4001/cart/')
            .then(response => {
                setProduct(response.data)
                console.log(response.data)
            })
    }, [])


        // loadUser1().then((res) => {
        //     setUser({
        //         userID: res.data._id
        //     })
        // });

        const addToWishList = (productID) => {
            console.log(productID);
        }

        const addToCarthandler = (product) => {
            //console.log(product);
            //dispatch(addToCart(productID))
            setCart({
                user: user.userID,
                product: [...Cart.product,product],
                totQuantity: Cart.totQuantity + 1
            })
            console.log(Cart);
        }

        const viewCart =() =>{
            console.log('this is from view cart redirect');
            return <Redirect to={{
                pathname: '/MyCart',
                state: { myCart: Cart }
            }}
            />
        }

        //const dispatch = useDispatch();


        const productList = Products.map((product, index) => {
            return <div className="col-sm-6 col-md-4 mb-3" key={index}>
                <div className="img-thumbnail">
                    <img src={product.PImage} className="img-responsive" alt="logo"/>
                    <div className="figure-caption ml-3">
                        <h3>{product.PName}</h3>
                        <p>{product.PDescription}</p>
                        <div className="clearfix">
                            <div className="pull-left"
                                 style={{fontWeight: "bold", fontSize: "16px"}}>Rs {product.PPrice}</div>
                            <p className="pull-right"><a onClick={() => addToCarthandler(product)}
                                                         className="btn btn-success" role="button">Add To Cart</a></p>
                        </div>
                    </div>
                </div>
            </div>
        })



        return (
            <div>
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
                                    <li className="nav-item active">
                                        <a className="nav-link" onClick={()=>viewCart()}><i className="fa fa-shopping-cart fa-2x" />
                                        <span className="badge-success badge-pill">{Cart.totQuantity}</span>
                                        Shopping Cart <span className="sr-only">(current)</span></a>
                                    </li>

                                    <li className="nav-item active">
                                        <a className="nav-link" onClick={() => logOut()}><i className="fa fa-user fa-2x" /> Logout <span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>

                            </div>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {productList}
                    </div>
                </div>
            </div>
        )

}
//export default LandingPage
const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});
export default connect(mapStateToProps,{ logOut})(LandingPage);