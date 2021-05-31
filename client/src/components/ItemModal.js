import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../actions/ItemActions";

export default function ItemModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name) return setError("Please enter an item");
    dispatch(addItem({ name }));
    setName("");
    toggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <p className="mb-3 ml-4">Please login to manage your items</p>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
              />
              {error && <p className="text-danger">{error}</p>}
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
