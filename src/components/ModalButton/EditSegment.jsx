import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'


function SubmitForm(event, props) {
    event.preventDefault();
    const formData = new FormData(event.target),
    formDataObj = Object.fromEntries(formData.entries())
    const newData= { name: formDataObj.name, clean: formDataObj.segmentclear }
    console.log(props)
    let url = "http://localhost:8080/users/" + props
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',            
        },
        body: JSON.stringify(newData),
    })
    .then(data => {console.log('Success:', data)})
    
}
class EditSegment extends Component {
    
    state = { 
     }
    
     constructor()
     {
       super()
       this.state={
         show:false
       }
    }
    render() { 
        return ( 
            
            <Form onSubmit={(event) => SubmitForm(event, this.props.segmentID)}>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    {/* <Form.Control type="text" name="name" placeholder={this.props.segmentName}/> */}
    <Form.Control as="select" name="segmentclear">
      <option>Segment is clear</option>
      <option>Segments need to be Shoveled</option>
      
    </Form.Control><br></br>
    <Button type="submit" variant="primary">Submit Report</Button>
  </Form.Group>
</Form>
         );
    }
}
 
export default EditSegment;