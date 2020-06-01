import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import 'date-fns';
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/core/styles";
import ReplyModal from "../Components/ReplyModal";
import Box from "@material-ui/core/Box";
import ToastMessage from "../Components/ToastMessage";
import "../Components/AlertStyles.css";
import Form from "react-bootstrap/Form";
import FormControl from "@material-ui/core/FormControl";
import ArrowIcon from '@material-ui/icons/ArrowUpward';
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Fab from "@material-ui/core/Fab";


class Feedback extends Component {


    constructor(props) {
        super(props);

        this.state = {
            feedbackList: [],
            showModale: false,
            showToast: false,
            toastMessage: '',
            toastType: '',
            typeColor: '',
            dateRange: {
                startDate: new Date(),
                endDate: new Date()
            }

        }

        window.onscroll = () => {
            this.scrollFunction()
        };
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

    useStyles = () => makeStyles((theme) => ({
        root: {
            width: "auto",
            display: 'flex',
            alignItems: 'center',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }));


// When the user scrolls down 20px from the top of the document, show the button


    scrollFunction() {

        let mybutton = document.getElementById("myBtn");

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }


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
                        typeColor: "warning"
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

    searchFeedback(event) {

        event.preventDefault();

        fetch("http://localhost:4001/feedback/search/" + this.state.dateRange.startDate + "/" + this.state.dateRange.endDate, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => this.setState({
                feedbackList: json
            }, () => {

                this.setState({
                    showModale: false
                }, () => {

                    let sortedList = this.state.feedbackList;

                    sortedList.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    })

                    this.setState({
                        feedbackList: sortedList
                    })

                    if (this.state.feedbackList.length > 0) {
                        this.setState({
                            showToast: true,
                            toastMessage: 'Results Found!!!',
                            toastType: 'Information',
                            typeColor: "success"
                        })


                    } else {

                        this.fetchData();

                        this.setState({
                            showToast: true,
                            toastMessage: 'No Results!!!',
                            toastType: 'Information',
                            typeColor: "info"
                        })
                    }
                })

                document.getElementById('start datetime-local').value = "";
                document.getElementById('end datetime-local').value = "";


            })).catch(() => {
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

            <>

                <Fab color="secondary" id="myBtn" aria-label="add" onClick={() => this.topFunction()}>
                    <ArrowIcon/>
                </Fab>

                <div className="fixed-bottom w-100" id="toastMessageAdmin">
                    <ToastMessage tId={"admin"} showFunction={this.setShow} showToast={this.state.showToast}
                                  message={this.state.toastMessage} messageType={this.state.toastType}
                                  statusColor={this.state.typeColor}/>
                </div>

                <div className="m-xl-5">
                    <Form onSubmit={(event) => this.searchFeedback(event)}>
                        <CardGroup>

                            <Card>
                                <Card.Title className="m-xl-5">Search&nbsp;by&nbsp;Date/Time&nbsp;Range</Card.Title>
                            </Card>
                            <Card>
                                <FormControl className="m-xl-5">
                                    <TextField
                                        id="start datetime-local"
                                        label="Start Date/Time"
                                        type="datetime-local"
                                        required
                                        onChange={(event) => this.setState({
                                            dateRange: {
                                                startDate: event.target.value,
                                                endDate: this.state.dateRange.endDate
                                            }

                                        }, () => {
                                            console.log(this.state.dateRange.startDate.toString())
                                        })}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Card>
                            <Card>
                                <FormControl className="m-xl-5">
                                    <TextField
                                        id="end datetime-local"
                                        label="End Date/Time"
                                        type="datetime-local"
                                        required
                                        onChange={(event) => this.setState({
                                            dateRange: {
                                                startDate: this.state.dateRange.startDate,
                                                endDate: event.target.value
                                            }
                                        }, () => {
                                            console.log(this.state.dateRange.endDate.toString())
                                        })}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>

                            </Card>
                            <Card>
                                <Button className="m-xl-5 btn" variant="primary" type="submit">Search</Button>
                            </Card>
                        </CardGroup>

                    </Form>
                </div>

                <hr/>

                {
                    feedbackList.map((feedback, index) => (
                        <div key={index}>
                            <div className="mr-xl-5 ml-xl-5">
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


            </>


        );
    }


}


export default (Feedback);

