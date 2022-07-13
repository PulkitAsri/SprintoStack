import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export const AddNewTodo = ({ onSubmit }) => {
  const [newTodoEditText, setNewTodoEditText] = useState("");
  const [prioritySelectedValue, setPrioritySelectedValue] = useState("LOW");

  return (
    <div className={styles.addNewTodoConatiner}>
      <form
        onSubmit={(e) => {
          onSubmit(e, newTodoEditText);
          setNewTodoEditText("");
        }}
      >
        <input
          className={styles.addNewTodoInput}
          value={newTodoEditText}
          onChange={(e) => setNewTodoEditText(e.target.value)}
        />

        <select
          value={prioritySelectedValue}
          onChange={(e) => setPrioritySelectedValue(e.target.value)}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button
          className={styles.addNewTodoButton}
          disabled={newTodoEditText === ""}
        >
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};
