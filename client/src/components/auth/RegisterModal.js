import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import { register as registerUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export default function RegisterModal() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const password = useRef({});
  password.current = watch("password", "");

  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                invalid={!!errors.name}
                valid={!errors.name && dirtyFields.name}
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <FormFeedback invalid>{errors.name?.message}</FormFeedback>

              <Label for="email">Email</Label>
              <Input
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
                disabled={!isValid || isSubmitting}
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
