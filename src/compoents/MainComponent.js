import React,{Component} from "react";
//import reactstrap

import Menu from "./MenuComponent";

import DishDetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import {Switch,Route,Redirect, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import About from "./AboutComponent";
import {postComment,fetchDishes,fetchComments,fetchPromos,fetchLeaders,postFeedback} from "../redux/ActionCreators";
import {actions} from "react-redux-form";
import {TransitionGroup, CSSTransition} from 'react-transition-group'


const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment:(dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
    postFeedback:(firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () =>{dispatch(fetchLeaders())},
    resetFeedbackForm: ()=>{dispatch(actions.reset('feedback'))},

});


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos()
        this.props.fetchLeaders();
    }

    render(){

        const HomePage = ()=>{
            return(
                <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                      dishesLoading = {this.props.dishes.isLoading}
                      dishesErrMess = {this.props.dishes.errMess}
                      promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                      promosLoading = {this.props.promotions.isLoading}
                      promosErrMess = {this.props.promotions.errMess}
                      leader={this.props.leaders.leaders.filter((leaders)=>leaders.featured)[0]}
                      leadersLoading = {this.props.leaders.isLoading}
                      leadersErrMess = {this.props.leaders.errMess}
                />
            );
        }


        const  DishWithId = ({match}) =>{
            return(
              <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id ===parseInt(match.params.dishId,10))}
                          isLoading = {this.props.dishes.isLoading}
                          errMess = {this.props.dishes.errMess}
                          comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
                          commentsErrMess = {this.props.comments.errMess}
                          postComment = {this.props.postComment}
              />
            );
        }

        return (
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={()=><Contact
                        postFeedback = {this.props.postFeedback}
                        resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                        {/*为什么要用箭头函数作为参数 代入component？？？*/}
                    <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                    <Redirect to="/home" />
                </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
