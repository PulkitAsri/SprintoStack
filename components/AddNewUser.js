import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_USER } from "../graphql/queries";
import styles from "../styles/Home.module.css";

export const AddNewUser = ({}) => {
  const initialNewUserState = {
    userName: "",
    email: "",
  };
  const [newUser, setNewUser] = useState(initialNewUserState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [createNewUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => window.location.reload(),
  });
  const addUserOnSubmit = (e, newUser) => {
    e.preventDefault();
    console.log(newUser);
    createNewUser({ variables: newUser });
  };

  return (
    <div className={styles.addNewTodoConatiner}>
      <h4>Add New User</h4>
      <form
        onSubmit={(e) => {
          addUserOnSubmit(e, newUser);
          setNewUser(initialNewUserState);
        }}
      >
        <input
          className={styles.addNewTodoInput}
          value={newUser.userName}
          name="userName"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
        />
        <button
          className={styles.addNewTodoButton}
          disabled={newUser.userName === ""}
        >
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};
