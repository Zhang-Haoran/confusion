import React from 'react';
import {Card,CardImg, CardText,CardBody,CardTitle,BreadcrumbItem,Breadcrumb} from 'reactstrap';
import {Link} from "react-router-dom";



    //show dish detail
   function RenderDish({dish}){
        //dish exists, show it in card
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={dish[0].image} alt={dish[0].name}/>
                    <CardBody>
                        <CardTitle>
                            {dish[0].name}
                        </CardTitle>
                        <CardText>
                            {dish[0].description}
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

    function RenderComments({dish}){
        let comments ="";//used to store the comments if the dish has comments
        if(dish != null) {
            const commentsArray = dish;
            if (commentsArray != null) {
                comments = commentsArray.map((comment) => {//map every comment in array, store the UI into comments
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

   const DishDetail =(props)=>
{
    console.log('DishDetail Component render is invoked')
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
                        {props.dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3> {props.dish.name}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.comments}/>
                </div>
            </div>
        </div>
    );
}

export default DishDetail