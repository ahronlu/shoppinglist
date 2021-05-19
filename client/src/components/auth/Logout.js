import React from "react";
import { NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

export default function Logout() {
  const dispatch = useDispatch();

  return (
    <>
      <NavLink className="text-white" onClick={() => dispatch(logout())} href="#">
        Logout
      </NavLink>
    </>
  );
}
