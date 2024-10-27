import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./Todo.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Todo() {
  const [task, setTask] = useState([]);
  const inputValue = useRef("");
  const [isComplete, setIsComplete] = useState(false);

  const renderTodo = async () => {
    await axios
      .get("http://localhost:3000/task")
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
      .post("http://localhost:3000/task", { data })
      .then(() => {
        console.log("Data added to database successfully");
        renderTodo();
        inputValue.current.value = "";
      })
      .catch((error) => console.log(error));
  };
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/task/${id}`)
      .then(() => {
        renderTodo();
      })
      .catch((error) => console.log(error));
  };

  const editTodo = (title, id) => {
    inputValue.current.value = title;
    const updateData = {
      title: inputValue.current.value,
    };

    if (!id) {
      axios
        .put(`http://localhost:3000/task/${id}`, { updateData })
        .then(() => console.log("Updated"))
        .catch((error) => console.log(error));
    } else {
    }

    deleteTodo(id);
  };

  const markComplete = (id) => {
    const complete = {
      completed: isComplete,
    };

    if (complete.completed) {
      setIsComplete(false);
      axios
        .patch(`http://localhost:3000/task/${id}`, { complete })
        .then((res) => {
          renderTodo();
        })
        .catch((error) => console.log(error));
    } else {
      setIsComplete(true);
      axios
        .patch(`http://localhost:3000/task/${id}`, { complete })
        .then(() => {
          renderTodo();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="d-flex flex-column align-items-center">
        <h1 className="text-black text-center mt-5 bg-white rounded p-1 w-100">
          Express Mongoose Todo
        </h1>
        <Col>
          <Form.Group className="mt-5 d-flex">
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
              <li key={task._id} className={task.completed ? "tick" : "untick"}>
                <span className="">{task.title}</span>

                <span>
                  <Button
                    className="btn-sm btn-success me-2"
                    onClick={() => markComplete(task._id)}
                  >
                    Done
                  </Button>
                  <Button
                    className="btn-sm me-2"
                    onClick={() => editTodo(task.title, task._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn-sm btn-danger"
                    onClick={() => deleteTodo(task._id)}
                  >
                    Delete
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
