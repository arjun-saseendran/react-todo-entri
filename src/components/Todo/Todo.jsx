import Form from "react-bootstrap/Form";
import { Container, Row, Button } from "react-bootstrap";

function Todo() {
  return (
    <Container>
      <Row>
        <Form>
          <Form.Control type="text" placeholder="Add todo" />
          <Button variant="dark">Add</Button>
          <ul>
            <li>Hello</li>
          </ul>
        </Form>
      </Row>
    </Container>
  );
}

export default Todo;
