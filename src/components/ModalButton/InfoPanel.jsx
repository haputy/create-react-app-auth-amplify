import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap'
import EditSegment from './EditSegment'

class InfoPanel extends Component {
    state = {  }
    constructor()
    {
      super()
      this.state={
        show:false,
        segmentName: null,
        segmentClean: null
      }
    }
    handleModal()
{
  this.setState({show:!this.state.show})
};

passRequired(req) {
  switch(req) {
    case 'y':
      return <p>Yes  <a href={this.props.passPurchaseLink} target="_blank" rel="noopener noreferrer">Pass Purchase Link</a></p>;
    case 'n':
      return <p>No</p>
    default:
      return null;

  }
};

difficulty(diff) {
  switch(diff) {
    case 2:
      return <p>Blue</p>
    case 1:
    return <p>Green</p>;
    case 0:
      return <p>No listed difficulty</p>
    default:
      return null;
  }
}

fetchdata(){
    
        fetch(`http://localhost:8080/users/${this.props.testnumber}`)
        .then(response => response.json())
        .then(data => this.setState({ segmentName: data[0].name, segmentClean: data[0].clean }))
      
       .then(this.setState({show:!this.state.show}))
    }

    render() { 
        return ( 
        <div>
          <div  className="popupStyle card p-2">
          <h5>{this.props.trailName}</h5>
          <h6>{this.props.systemName}</h6>
          <p>{this.difficulty(this.props.difficulty)}
          Pass Required: {this.passRequired(this.props.passReq)} 
          <a href={this.props.skinnySki} target="_blank" rel="noopener noreferrer">Conditions</a>
          </p>
          
          
        </div>
        
          </div> );
    }
}
 
export default InfoPanel;