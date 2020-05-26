import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/core/styles";
import ReplyModal from "../Components/ReplyModal";
import Box from "@material-ui/core/Box";
import ToastMessage from "../Components/ToastMessage";
import "../Components/AlertStyles.css";

//import {Link} from "react-router-dom";


class Feedback extends Component {


    constructor(props) {
        super(props);

        this.state = {
            feedbackList: [],
            showModale: false,
            showToast: false,
            toastMessage: '',
            toastType: 'Error',
            typeColor: 'error'
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    labels = {

        1: 'Useless',

        2: 'Very Bad',

        3: 'Poor',

        4: 'Okay',

        5: 'Not Bad',

        6: 'Good',

        7: 'Excellent',
    };

    setShow = (val) => {
        this.setState({
            showToast: val
        })
    }

    fetchData = () => {
        const url = "http://localhost:4001/feedback/";
        fetch(url).then(response => response.json())
            .then(json => this.setState({
                feedbackList: json
            }, () => {

                let sortedList = this.state.feedbackList;

                sortedList.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })

                this.setState({
                    feedbackList: sortedList
                })
            })).catch(() => {
            this.setState({
                showToast: true,
                toastMessage: "Unexpected Issue Occurred...",
                toastType: 'Error',
                typeColor: "error"
            });

            setTimeout(() => {
                this.setState({
                    showToast: false
                })
            }, 5000);
        });
    }

    useStyles = () => makeStyles({
        root: {
            width: "auto",
            display: 'flex',
            alignItems: 'center',
        }
    });

    onReplySubmit = (event, obj) => {

        event.preventDefault();

        console.log(obj.feedback)


        fetch("http://localhost:4001/feedback/" + obj.feedback._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj.feedback)
        }).then((r) => {

            this.setState({
                showModale: false
            }, () => {

                if (r.status === 200) {
                    this.setState({
                        showToast: true,
                        toastMessage: 'Replied to the Feedback!!!',
                        toastType: 'Information',
                        typeColor: "success"
                    })

                    this.fetchData();
                } else {
                    this.setState({
                        showToast: true,
                        toastMessage: "Unexpected Response Status " + r.status + " Occurred...",
                        toastType: 'Error',
                        typeColor: "error"
                    });
                }
            })


        }).catch(() => {
            this.setState({
                showToast: true,
                toastMessage: "Unexpected Issue Occurred...",
                toastType: 'Error',
                typeColor: "error"
            });
        });

        setTimeout(() => {
            this.setState({
                showToast: false
            })
        }, 5000);
    }


    render() {


        const classes = this.useStyles();

        const feedbackList = this.state.feedbackList;


        return (


            <div className="pt-0">
                <div className="fixed-bottom w-100" id="toastMessageAdmin">
                    <ToastMessage tId={"admin"} showFunction={this.setShow} showToast={this.state.showToast}
                                  message={this.state.toastMessage} messageType={this.state.toastType}
                                  statusColor={this.state.typeColor}/>
                </div>
                <Container>
                    <Card className="pt-0">
                        <Card.Header as="h5">Feedback&nbsp;from&nbsp;Users</Card.Header>
                        <Card.Body>

                            {
                                feedbackList.map((feedback, index) => (
                                    <div key={index}>
                                        <div className="mr-5">
                                            <Card>
                                                <Card.Header>
                                                    <div className="float-left">
                                                        {feedback.name}
                                                    </div>
                                                    <div className="float-right">
                                                        {feedback.email}
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className="float-left w-75">

                                                        <Card.Title>{feedback.comment}</Card.Title>

                                                        <div className={classes.root}>
                                                            <Rating
                                                                size="large"
                                                                max={7}
                                                                name="read-only size-large"
                                                                value={feedback.rating}
                                                                precision={1}
                                                                readOnly
                                                            />
                                                            <Box ml={0.5}
                                                                 className="text-muted">{this.labels[feedback.rating]}</Box>
                                                        </div>

                                                        <hr/>

                                                        {
                                                            feedback.reply !== "" ?
                                                                <div>
                                                                    <Card.Subtitle>Reply</Card.Subtitle>
                                                                    <Card.Text>{feedback.reply}</Card.Text>
                                                                </div> : <></>
                                                        }


                                                    </div>
                                                    <div className="float-right flex-row w-25 text-center">

                                                        <ReplyModal showModal={this.state.showModale}
                                                                    onReplySubmit={this.onReplySubmit}
                                                                    feedbackObj={feedback}/>

                                                    </div>


                                                </Card.Body>
                                                <Card.Footer>
                                                    <div className="float-left">
                                                        Created&nbsp;on&nbsp;{new Date(feedback.createdAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.createdAt).toLocaleTimeString()}
                                                    </div>
                                                    {
                                                        feedback.reply !== "" ?
                                                            <div className="float-right">
                                                                Replied&nbsp;on&nbsp;{new Date(feedback.updatedAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.updatedAt).toLocaleTimeString()}
                                                            </div> : <></>
                                                    }
                                                </Card.Footer>

                                            </Card>
                                        </div>
                                        <hr/>
                                    </div>
                                ))

                            }
                        </Card.Body>
                    </Card>
                </Container>
            </div>


        );
    }


}


export default (Feedback);