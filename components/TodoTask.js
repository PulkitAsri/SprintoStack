import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { priorityColors } from "../constants";
import { DELETE_TASK, UPDATE_TASK } from "../graphql/queries";
import styles from "../styles/Home.module.css";
import { calculateNoOfDaysFromToday } from "../util/calculateNoOfDaysFromToday";

export const TodoTask = ({ taskData, allUsers }) => {
  const [editState, setEditState] = useState(false);
  const [updatedTaskData, setUpdatedTaskData] = useState(taskData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTaskData((prev) => {
      if (name === "userId") return { ...prev, [name]: parseInt(value) };
      return { ...prev, [name]: value };
    });
  };

  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: (data) => window.location.reload(),
  });
  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: (data) => window.location.reload(),
  });
  const handleDelete = (e) => {
    e.preventDefault();
    console.log(taskData.id);
    deleteTask({ variables: { deleteTaskId: taskData.id } });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(updatedTaskData);
    updateTask({ variables: updatedTaskData });
  };
  console.log(updatedTaskData);
  // return <div className={styles.todoContainer}></div>;
  return (
    <div className={styles.todoContainer}>
      {editState ? (
        <div className={styles.editableContainer}>
          <input
            name="taskDescription"
            value={updatedTaskData.taskDescription}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={updatedTaskData.dueDate}
            onChange={handleChange}
          />
          <select
            name="priority"
            value={updatedTaskData.priority}
            onChange={handleChange}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <select
            name="userId"
            value={updatedTaskData.userId}
            onChange={handleChange}
          >
            {allUsers.map((user) => (
              <option value={user.id} key={user.id}>
                {user.userName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={styles.taskInfo}>
          <p className={styles.taskDesc}>{taskData.taskDescription}</p>
          <p>~{taskData.userId}</p>
        </div>
      )}
      <div
        className={styles.taskPriorityCircle}
        style={{ backgroundColor: priorityColors[taskData.priority] }}
      />

      <button
        className={styles.taskButton}
        onClick={(e) => {
          e.preventDefault();
          setEditState(!editState);
          if (
            editState &&
            JSON.stringify(taskData) !== JSON.stringify(updatedTaskData)
          )
            handleUpdate(e);
        }}
      >
        <span>{editState ? `Save` : `Edit`}</span>
      </button>
      <button className={styles.taskButton} onClick={handleDelete}>
        <span>Delete</span>
      </button>

      <input type="checkbox" value={taskData.completed} onChange={() => {}} />
      <span
        className={styles.todoDueDate}
        style={{
          color:
            calculateNoOfDaysFromToday(taskData.dueDate).diffDays >= 0
              ? "green"
              : "red",
        }}
      >
        {calculateNoOfDaysFromToday(taskData.dueDate).message}
      </span>
    </div>
  );
};
