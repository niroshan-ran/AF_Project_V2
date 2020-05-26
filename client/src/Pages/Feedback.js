import React, {Component} from "react";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ToastMessage from "./Components/ToastMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Components/AlertStyles.css";

class Feedback extends Component {

    labels = {

        1: 'Useless',

        2: 'Very Bad',

        3: 'Poor',

        4: 'Okay',

        5: 'Not Bad',

        6: 'Good',

        7: 'Excellent',
    };

    constructor(props) {
        super(props);

        this.state = {
            feedback: {
                name: "",
                email: "",
                rating: 1,
                comment: "",
                reply: ""
            },
            feedbackList: [],
            hover: -1,
            showToast: false,
            toastMessage: '',
            toastType: 'Error',
            typeColor: 'error'
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    setShow = (val) => {
        this.setState({
            showToast: val
        })
    }

    calculateAverageRating() {

        let feedbackList = this.state.feedbackList;

        let nFeedbacks = feedbackList.length;

        let totalRating = 0;

        feedbackList.map((feedback) => {

            totalRating += feedback.rating

        });

        return totalRating / nFeedbacks;


    }

    roundAverageRating() {

        let overallRating = this.calculateAverageRating();

        if (overallRating < 0.5) {
            return 0;
        } else if (overallRating < 1) {
            return 0.5;
        } else if (overallRating < 1.5) {
            return 1;
        } else if (overallRating < 2) {
            return 1.5;
        } else if (overallRating < 2.5) {
            return 2;
        } else if (overallRating < 3) {
            return 2.5;
        } else if (overallRating < 3.5) {
            return 3;
        } else if (overallRating < 4) {
            return 3.5;
        } else if (overallRating < 4.5) {
            return 4;
        } else if (overallRating < 5) {
            return 4.5;
        } else if (overallRating < 5.5) {
            return 5;
        } else if (overallRating < 6) {
            return 5.5;
        } else if (overallRating < 6.5) {
            return 6;
        } else if (overallRating < 7) {
            return 6.5;
        } else {
            return 7;
        }
    }

    fetchData = () => {
        const url = "http://localhost:4001/feedback/";
        fetch(url).then(response => response.json())
            .then(json => this.setState({
                feedbackList: json
            }, () => {

                let sortedList = this.state.feedbackList;

                sortedList.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt)
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
            width: 200,
            display: 'flex',
            alignItems: 'center',
        },
    });

    classes = this.useStyles();

    HoverRating = () => {

        return (
            <div className={this.classes.root}>
                <Rating
                    size="large"
                    max={7}
                    name="hover-feedback size-large"
                    value={this.state.feedback.rating}
                    precision={1}
                    onChange={(event, newValue) => {
                        if (newValue <= 1) {
                            this.setState({
                                feedback: {
                                    name: this.state.feedback.name,
                                    email: this.state.feedback.email,
                                    rating: 1,
                                    comment: this.state.feedback.comment,
                                    reply: this.state.feedback.reply
                                }

                            });
                        } else {
                            this.setState({
                                feedback: {
                                    name: this.state.feedback.name,
                                    email: this.state.feedback.email,
                                    rating: newValue,
                                    comment: this.state.feedback.comment,
                                    reply: this.state.feedback.reply
                                }

                            })
                        }

                    }}
                    onChangeActive={(event, newHover) => {
                        this.setState({
                            hover: newHover
                        });
                    }}
                />
                <Box ml={0.5}
                     className="text-muted">{this.labels[this.state.hover !== -1 ? this.state.hover : this.state.feedback.rating]}</Box>
            </div>
        );
    }


    onChangeText = (event) => {
        switch (event.target.id) {

            case "name" :
                this.setState({
                    feedback: {
                        name: event.target.value,
                        email: this.state.feedback.email,
                        rating: this.state.feedback.rating,
                        comment: this.state.feedback.comment,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            case "emailId":
                this.setState({
                    feedback: {
                        name: this.state.feedback.name,
                        email: event.target.value,
                        rating: this.state.feedback.rating,
                        comment: this.state.feedback.comment,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            case "comment":
                this.setState({
                    feedback: {
                        name: this.state.feedback.name,
                        email: this.state.feedback.email,
                        rating: this.state.feedback.rating,
                        comment: event.target.value,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            default:
                break;

        }
    }

    onFeedbackPost = (event) => {
        event.preventDefault();

        console.log(this.state.feedback);

        fetch("http://localhost:4001/feedback/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.feedback)
        }).then((r) => {

            if (r.status === 200) {
                this.setState({

                    feedback: {
                        name: "",
                        email: "",
                        rating: 1,
                        comment: "",
                        reply: ""
                    },
                    showToast: true,
                    toastMessage: 'Feedback Posted Successfully!!!',
                    toastType: 'Information',
                    typeColor: "success"


                });
                document.getElementById('name').value = '';
                document.getElementById('emailId').value = '';
                document.getElementById('comment').value = '';
                this.fetchData();

            } else {
                this.setState({
                    showToast: true,
                    toastMessage: "Unexpected Response Status " + r.status + " Occurred...",
                    toastType: 'Error',
                    typeColor: "error"
                });

            }

        }).catch(() => {
            this.setState({
                showToast: true,
                toastMessage: "Unexpected Issue Occurred...",
                toastType: 'Error',
                typeColor: "error"
            });
        })

        setTimeout(() => {
            this.setState({
                showToast: false
            })
        }, 5000);

    }

    render() {

        let feedbackList = this.state.feedbackList;

        return (
            <>
                <Header/>
                <div className="fixed-top w-100" id="toastMessage">
                    <ToastMessage tId={"general"} showFunction={this.setShow} showToast={this.state.showToast}
                                  message={this.state.toastMessage} messageType={this.state.toastType}
                                  statusColor={this.state.typeColor}/>
                </div>


                <Row>
                    <Col>
                        <div className="ml-xl-5 pl-xl-5">
                            <Card className="pt-0">
                                <Card.Header as="h5">Feedback</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={(event) => this.onFeedbackPost(event)}>
                                        <Form.Group>
                                            <Form.Label>Your&nbsp;Name</Form.Label>
                                            <Form.Control id="name" onChange={(event) => this.onChangeText(event)}
                                                          type="text" placeholder="Enter your Name here..."
                                                          required/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email&nbsp;Address</Form.Label>
                                            <Form.Control id="emailId" type="email"
                                                          onChange={(event) => this.onChangeText(event)}
                                                          placeholder="Enter your Email here.." required/>
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Your&nbsp;Rating</Form.Label>
                                            {this.HoverRating()}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control id="comment" as="textarea" required rows="3"
                                                          onChange={(event) => this.onChangeText(event)}
                                                          placeholder="Add your Comment here..."/>
                                        </Form.Group>

                                        <Button variant="primary" type="submit" block>
                                            Publish
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>


                    </Col>
                    <Col>
                        <div className="pr-xl-5 mr-xl-5">
                            <Row>
                                <Col>

                                    <Card>
                                        <Card.Header as="h5">Overall&nbsp;Rating&nbsp;:&nbsp;
                                            <strong>{this.calculateAverageRating().toFixed(2)}</strong></Card.Header>
                                        <Card.Body>

                                            <div className={this.classes.root}>
                                                <Rating
                                                    size="large"
                                                    max={7}
                                                    name="half-rating-read size-large"
                                                    value={this.roundAverageRating()}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                            </div>


                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <Card>
                                        <Card.Header as="h5"
                                                     id="feedbackHeader">Feedback&nbsp;from&nbsp;Users</Card.Header>
                                    </Card>
                                    <Card className="pt-0 overflow-auto" id="list">
                                        <Card.Body>

                                            <div>
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
                                                                        <div className="float-left w-100">

                                                                            <Card.Title>{feedback.comment}</Card.Title>

                                                                            <div className={this.classes.root}>
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
                                            </div>
                                        </Card.Body>
                                    </Card>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>


            </>
        );
    }


}


export default Feedback;