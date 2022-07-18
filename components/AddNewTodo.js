import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_TASK } from "../graphql/queries";
import styles from "../styles/Home.module.css";

export const AddNewTodo = ({ allUsers }) => {
  const initialNewTaskState = {
    taskDescription: "",
    priority: "LOW",
    completed: false,
    dueDate: new Date().toJSON().slice(0, 10),
    userId: null,
  };

  // const { loading, error, data } = useQuery(GET_ALL_TASKS);

  const [newTask, setNewTask] = useState(initialNewTaskState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => {
      if (name === "userId") return { ...prev, [name]: parseInt(value) };
      return { ...prev, [name]: value };
    });
    // console.log(newTask);
  };
  const [createNewTask] = useMutation(CREATE_TASK, {
    onCompleted: (data) => window.location.reload(),
  });
  const addTaskOnSubmit = (e, newTask) => {
    e.preventDefault();
    console.log(newTask);
    createNewTask({ variables: newTask });
  };

  return (
    <div className={styles.addNewTodoConatiner}>
      <form
        onSubmit={(e) => {
          addTaskOnSubmit(e, newTask);
          setNewTask(initialNewTaskState);
        }}
      >
        <input
          className={styles.addNewTodoInput}
          value={newTask.taskDescription}
          name="taskDescription"
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
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
        <select
          name="userId"
          value={newTask.userId || ""}
          onChange={handleChange}
        >
          <option disabled hidden value="">
            -- select an option --
          </option>

          {allUsers.map((user) => (
            <option value={user.id} key={user.id}>
              {user.userName}
            </option>
          ))}
        </select>
        <button
          className={styles.addNewTodoButton}
          disabled={
            newTask.taskDescription === "" ||
            newTask.userId === null ||
            newTask.userId === -1
          }
        >
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};
