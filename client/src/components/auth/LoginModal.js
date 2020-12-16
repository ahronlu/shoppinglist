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
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export default function LoginModal() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ user: "", password: "" });
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState(null);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

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

  const toggle = () => {
    dispatch(clearErrors());
    setModal(!modal);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  const { email, password } = user;

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
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
              />
              <Button
                disabled={!email || !password}
                color="dark"
                style={{ marginTop: "2rem" }}
                block
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
