import React from "react";
import {Card} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import LogedinHeader from "./LogedInHeader";
//import {Link} from "react-router-dom";


const ContactUs = () => {
    return (
        <>
            <LogedinHeader/>
            <Container>
                <Card>
                    <Card.Header><h1>About&nbsp;Us</h1></Card.Header>
                    <Card.Body>
                        <Card.Text><h6>Our Team Members</h6></Card.Text>
                        <ul>
                            <li>IT17164054&nbsp;&nbsp;&nbsp;&nbsp;Ranasinghe I.N</li>
                            <li>IT18012552&nbsp;&nbsp;&nbsp;&nbsp;Antany M.D.S.M</li>
                            <li>IT18013924&nbsp;&nbsp;&nbsp;&nbsp;Ferreira L. V</li>
                            <li>IT18013092&nbsp;&nbsp;&nbsp;&nbsp;Aadil M.R.M</li>
                        </ul>
                    </Card.Body>
                    <Card.Footer>
                        <p>
                            This Project is done by 3rd Year 1st Semester Student Team named "SLIIT Titans Squad"
                        </p>
                    </Card.Footer>
                </Card>
            </Container>

        </>
    );
}


export default (ContactUs);