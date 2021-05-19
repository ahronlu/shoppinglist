import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { getItems, deleteItem } from "../actions/ItemActions";

export default function ShoppingList() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <Container>
        <TransitionGroup className="shopping-list">
          <ListGroup>
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {name}{" "}
                {isAuthenticated ? (
                  <i
                    onClick={() => dispatch(deleteItem(_id))}
                    class="fas fa-trash-alt"
                  ></i>
                ) : null}
              </ListGroupItem>
            </CSSTransition>
          ))}
          </ListGroup>
        </TransitionGroup>
    </Container>
  );
}
