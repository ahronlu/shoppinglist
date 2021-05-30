import React, { useEffect } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";

import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <div className="App">
      <AppNavbar />
      <main>
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </main>
    </div>
  );
}
