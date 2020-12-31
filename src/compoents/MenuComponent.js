import React,{Component} from 'react';
import {Card, CardImg, CardImgOverlay,CardText,CardBody, CardTitle} from "reactstrap";
import DishDetail from "./DishdetailComponent";
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDish: null
        }
        console.log('Menu Component constructor is invoked');
    }

    componentDidMount() {
        console.log('Menu Component didMount is invoked');
    }
    //when dish is clicked, change the selectedDish state
    onDishSelect(dish){
        this.setState({selectedDish:dish});
    }
    //when dish is clicked, show detailed information
    // renderDish(dish) {
    //     if (dish != null){
    //         return (
    //           <Card>
    //               <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
    //               <CardBody>
    //                   <CardTitle>
    //                       {dish.name}
    //                   </CardTitle>
    //                   <CardText>
    //                       {dish.description}
    //                   </CardText>
    //               </CardBody>
    //           </Card>
    //         );
    //     }else{
    //         return (
    //             <div></div>
    //         );
    //     }
    // }
    //display every dish on the page
    render() {
        const menu = this.props.dishes.map((dish)=>{
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">
                  <Card onClick={()=> this.onDishSelect(dish)}>
                          <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                      <CardImgOverlay>
                          <CardTitle>
                              {dish.name}
                          </CardTitle>
                      </CardImgOverlay>
                  </Card>
              </div>
            );
        });
        console.log('Menu Component render is invoked')
        return (
            <div className="container">
                <div className="row">
                        {menu}
                </div>

                    {/*show dish details*/}
                    {/*{this.renderDish(this.state.selectedDish)}*/}
                    <DishDetail selectedDishes = {this.state.selectedDish} />

            </div>
        );
    }
}
export default Menu;