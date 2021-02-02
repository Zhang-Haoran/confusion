import React from "react";
import {Media} from "reactstrap";
import {baseUrl} from "../shared/baseUrl";

function RenderLeader({leader}){
    return(
                      <Media tag="li">
                          <Media left middle>
                              <Media object src={baseUrl + leader.image} alt={leader.name}/>
                          </Media>
                          <Media body className="ml-5">
                              <Media heading>
                                  {leader.name}
                              </Media>
                              <p>{leader.designation}</p>
                              <p>{leader.description}</p>
                          </Media>
                      </Media>



    );
}
export default RenderLeader;