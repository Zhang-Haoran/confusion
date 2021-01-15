import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    BreadcrumbItem,
    Breadcrumb,
    Modal,
    ModalHeader,
    ModalBody, FormGroup, Label, Col, Button, Row
} from 'reactstrap';
import {Link} from "react-router-dom";
import {Errors, LocalForm,Control} from "react-redux-form";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val)||(val.length <=len);
const minLength = (len) => (val) => (val)&&(val.length >=len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }


    toggleModal(){
        this.setState(
            {
                isModalOpen: !this.state.isModalOpen
            }
        )
    }

    handleSubmit(values){
       this.props.postComment(this.props.dishId,values.rating,values.author,values.comment)
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"/>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values => this.handleSubmit(values))}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                        <Control.select className="form-control" name="rating" model=".rating" id="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text className="form-control" model=".author" id="author" name="author" placeholder="Your Name"
                                                  validators={
                                                      {
                                                          required,minLength:minLength(3),maxLength: maxLength(15)
                                                      }
                                                  }/>
                                    <Errors model=".author" className="text-danger" show="touched" messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea className="form-control" model=".comment" id="comment" name="comment" row="6">

                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        )
    }

}


    //show dish detail
   function RenderDish({dish}){
        //dish exists, show it in card
        if(dish != null){
            return(
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl+dish[0].image} alt={dish[0].name}/>
                    <CardBody>
                        <CardTitle>
                            {dish[0].name}
                        </CardTitle>
                        <CardText>
                            {dish[0].description}
                        </CardText>
                    </CardBody>
                </Card>
                </FadeTransform>

            );
        }else{//dish doesn't exists, show empty div
            return (
                <div></div>
            );
        }
    }

    function RenderComments({dish,postComment,dishId}){
        let comments ="";//used to store the comments if the dish has comments
        if(dish != null) {
            const commentsArray = dish;
            if (commentsArray != null) {
                comments = commentsArray.map((comment) => {//map every comment in array, store the UI into comments
                    return (
                        <Fade in>
                        <div key={comment.id}>
                            <ul className="list-unstyled">

                                <li>{comment.comment}</li>
                                <li>-- {comment.author}, {new Intl.DateTimeFormat('en-AU',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>

                            </ul>
                        </div>
                        </Fade>


                    );
                })
            }
        }

        //if dish is not null, show comments
        if(dish != null){
            return(
                <div>
                    <h4>Comments</h4>
                <Stagger in>
                    {comments}
                </Stagger>
                    <CommentForm dishId = {dishId} postComment={postComment}/>
                </div>
            );
        }else {//if dish is null which means it is initialized at first time, don't show Comments heading
            return(
                <div></div>
            )
        }



    }

   const DishDetail =(props)=>
{
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        )
    }else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }else {
        //props contains selectedDishes as its key
        //selectedDishes: {id: 3, name: "ElaiCheese Cake", image: "assets/images/elaicheesecake.png", c....
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish[0].name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3> {props.dish[0].name}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments dish={props.comments} postComment={props.postComment} dishId={props.dish[0].id}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default DishDetail