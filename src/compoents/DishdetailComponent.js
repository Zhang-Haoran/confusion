import React,{Component} from 'react';
import {Card,CardImg, CardImgOverlay, CardText,CardBody,CardTitle} from 'reactstrap';
class DishDetail extends Component{
    constructor(props) {
        super(props);
        console.log('DishDetail Component constructor is invoked');

    };


    //show dish detail
    renderDish(dish){
        console.log(dish);
        //dish exists, show it in card
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            );
        }else{//dish doesn't exists, show empty div
            return (
                <div></div>
            );
        }
    }

    renderComments(dish){
        let comments ="";//used to store the comments if the dish has comments
        if(dish != null) {
            const commentsArray = dish.comments;
            if (commentsArray != null) {
                comments = commentsArray.map((comment) => {//map every comment in array, store the UI into comments
                    console.log(comment);
                    return (

                        <div key={comment.id}>
                            <ul className="list-unstyled">
                                <li>{comment.comment}</li>
                                <li>-- {comment.author}, {new Intl.DateTimeFormat('en-AU',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                            </ul>
                        </div>

                    );
                })
            }
        }

        //if dish is not null, show comments
        if(dish != null){
            return(
                <div>
                    <h4>Comments</h4>
                    {comments}
                </div>
            );
        }else {//if dish is null which means it is initialized at first time, don't show Comments heading
            return(
                <div></div>
            )
        }



    }

    render() {
        console.log('DishDetail Component render is invoked')
        console.log(this.props);
        //props contains selectedDishes as its key
        //selectedDishes: {id: 3, name: "ElaiCheese Cake", image: "assets/images/elaicheesecake.png", c....
            return (
                <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
                </div>
            );

    }

}
export default DishDetail