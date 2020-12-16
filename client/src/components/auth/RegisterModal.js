import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export default function RegisterModal() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ name: "", user: "", password: "" });
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(null);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  const toggle = () => {
    dispatch(clearErrors());
    setModal(!modal);
  };

  useEffect(() => {
    if (error) {
      if (error.id === "LOGIN_FAIL") {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (modal) {
      if (isAuthenticated) {
        setModal(false);
      }
    }
  }, [error, isAuthenticated, modal]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user));
  };

  const { name, email, password } = user;

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Name"
                className="mb-3"
                onChange={onChange}
                minlength="2"
                required
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
                required
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
                minlength="6"
                required
              />
              <Button
                disabled={!name || !email || !password}
                color="dark"
                style={{ marginTop: "2rem" }}
                block
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
