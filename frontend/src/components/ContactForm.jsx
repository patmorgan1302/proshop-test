import Form from 'react-bootstrap/Form';

function TextControlsExample() {
  return (
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Name Here..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder='Enter Your Message...'/>
        </Form.Group>
        </Form>
    );
    }

export default TextControlsExample;