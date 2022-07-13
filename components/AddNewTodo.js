import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export const AddNewTodo = ({ onSubmit }) => {
  const initialNewTaskState = {
    taskDescription: "",
    priority: "LOW",
    completed: false,
    dueDate: new Date().toJSON().slice(0, 10),
  };
  const [newTask, setNewTask] = useState(initialNewTaskState);
  const [newTodoEditText, setNewTodoEditText] = useState("");
  const [prioritySelectedValue, setPrioritySelectedValue] = useState("LOW");
  const handleChange = (e) => {
    const { name ,value } = e.target;
    setNewTask((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <div className={styles.addNewTodoConatiner}>
      <form
        onSubmit={(e) => {
          onSubmit(e, newTask);
          setNewTask(initialNewTaskState);
        }}
      >
        <input
          className={styles.addNewTodoInput}
          value={newTask.taskDescription}
          name="taskDescription"
          onChange={handleChange}
        />

        <select
          name="priority"
          value={newTask.priority}
          onChange={handleChange}        
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleChange} />
        <button
          className={styles.addNewTodoButton}
          disabled={newTask.taskDescription === ""}
        >
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};
