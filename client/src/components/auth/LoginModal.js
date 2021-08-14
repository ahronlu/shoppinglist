import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  NavLink,
  Alert,
} from "reactstrap";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export default function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                invalid={!!errors.email}
                valid={!errors.email && dirtyFields.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <FormFeedback invalid>{errors.email?.message}</FormFeedback>

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                invalid={!!errors.password}
                valid={!errors.password && dirtyFields.password}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                  pattern: {
                    message:
                      "Please enter a valid password with at least 6 chars",
                  },
                })}
              />
              <FormFeedback invalid>{errors.password?.message}</FormFeedback>

              <Button
                disabled={isSubmitting || !isValid}
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
