import React,{Component} from "react";
//import reactstrap
import {Navbar, NavbarBrand} from "reactstrap";
import Menu from "./compoents/MenuComponent";
import {DISHES} from "./shared/dishes";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes:DISHES
    };
  }
  render(){
    return (
        <div>
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">
                Ristorante Con Fusion
              </NavbarBrand>
            </div>
          </Navbar>
            {/*pass dish information to menu component*/}
          <Menu dishes={this.state.dishes}/>
        </div>
    );
  }

}

export default App;
