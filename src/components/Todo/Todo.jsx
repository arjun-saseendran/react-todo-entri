import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./Todo.css";
import { useRef, useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const inputValue = useRef("");
  const liElement = useRef(undefined);

  const addTask = () => {
    setTasks([...tasks, inputValue.current.value]),
      (inputValue.current.value = "");
  };
  const deleteTodo = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTodo = (index) => {
    const editTask = tasks.splice(index, 1);
    inputValue.current.value = editTask;
    const newTasks = [...tasks];
    setTasks(newTasks);
  };

  const markComplete = () => {
    liElement.current.style.backgroundColor = "gray";
    liElement.current.style.textDecoration = "line-through";
  };

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
              <li key={index} ref={liElement}>
                <span className="mt-1 ms-0">
                  <input
                    type="checkbox"
                    className="me-1"
                    onClick={() => markComplete()}
                  />

                  {task}
                </span>

                <span>
                  <Button
                    className="me-2 btn-sm btn-danger"
                    onClick={() => deleteTodo(index)}
                  >
                    Delete
                  </Button>
                  <Button className="btn-sm" onClick={() => editTodo(index)}>
                    Edit
                  </Button>
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
