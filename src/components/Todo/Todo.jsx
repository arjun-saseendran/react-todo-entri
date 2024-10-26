import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./Todo.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Todo() {
  const [task, setTask] = useState([]);
  const inputValue = useRef("");
  const liElement = useRef(undefined);

  const renderTodo = async () => {
    await axios
      .get("http://localhost:3000")
      .then((response) => setTask(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    renderTodo();
  }, []);

  const addTask = () => {
    const data = {
      title: inputValue.current.value,
      completed: false,
    };

    axios
      .post("http://localhost:3000", { data })
      .then(() => {
        console.log("Data added to database successfully");
        renderTodo();
        inputValue.current.value = "";
      })
      .catch((error) => console.log(error));
  };
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/${id}`)
      .then(() => {
        renderTodo();
      })
      .catch((error) => console.log(error));
  };

  const editTodo = (title, id) => {
    inputValue.current.value = title;
    const updateData = {
      title: inputValue.current.value,
      isComplete: false,
    };

    if (!id) {
      axios
        .put(`http://localhost:3000/${id}`, updateData)
        .then(() => console.log("Updated"))
        .catch((error) => console.log(error));
    } else {
    }

    deleteTodo(id);
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
            {task.map((task) => (
              <li ref={liElement} key={task._id}>
                <span className="mt-1 ms-0">
                  <input
                    type="checkbox"
                    className="me-1"
                    onClick={() => markComplete()}
                  />

                  {task.title}
                </span>

                <span>
                  <Button
                    className="me-2 btn-sm btn-danger"
                    onClick={() => deleteTodo(task._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="btn-sm"
                    onClick={() => editTodo(task.title, task._id)}
                  >
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
