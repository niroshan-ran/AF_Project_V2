import React from "react";
//import {Link} from "react-router-dom";
import "../CSS/dashboard.css";
import image1 from "../Images/dressnew1.jpg";
import image2 from "../Images/dressnew2.jpg";
import image3 from "../Images/dressnew3.jpg";
import image5 from "../Images/dressnew4.jpg";
import image6 from "../Images/dressnew5.jpg";
import image7 from "../Images/dressnew6.jpg";
import Header from "./Header";

const Dashboard = () => {
    return (
    <div>
        <Header/>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={image1} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={image2} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={image3} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={image7} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={image5} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src={image6} className="d-block w-100" alt="..."/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    </div>
    );
}


export default (Dashboard);