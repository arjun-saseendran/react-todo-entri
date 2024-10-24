import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./Todo.css";
import { useRef, useState } from "react";

function Todo() {
    const [tasks, setTasks] = useState([])
    const inputValue = useRef('')
    const addTask = () => { 
        
        setTasks([...tasks,inputValue.current.value]),inputValue.current.value = ''}
        const deleteTodo = (index) => {

          const newTasks = [...tasks]
           newTasks.splice(index, 1)
          setTasks(newTasks)
        }

   

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="d-flex flex-column align-items-center">
        <Col>
          <Form.Group className="w-100 mt-5 d-flex ">
            <Form.Control
              ref={inputValue}
              type="text"
              placeholder="Add todo.."
            />
            <Button variant="dark ms-2" onClick={() => addTask()}>
              Add
            </Button>
          </Form.Group>
        </Col>
        <Col>
          <ul className="mt-3">
            {tasks.map((task, index) => (
              <li key={index} onClick={()=>deleteTodo(index)}>
                <span className="mt-1 ms-0">
                  <input type="checkbox" className="mx-2" />
                  {task}
                </span>

                <span>
                  <Button className="me-2 btn-sm btn-danger">Delete</Button>
                  <Button className="btn-sm">Edit</Button>
                </span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;
