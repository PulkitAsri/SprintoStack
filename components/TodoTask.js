import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const priorityColors={
  "HIGH": 'red',
  "MEDIUM": 'yellow',
  "LOW": 'green'
}

export const TodoTask = ({taskData}) => {

  const [editState, setEditState] = useState(false);

  return (
    <div className={styles.todoContainer}>
      {editState ? (
        <input className={styles.taskDesc} />
      ) : (
        <span className={styles.taskDesc}>{taskData.taskDescription}</span>
      )}

      <div className={styles.taskPriorityCircle}  style={{backgroundColor: priorityColors[taskData.priority]}}/>
      <button
        className={styles.taskButton}
        onClick={(e) => {
          e.preventDefault();
          setEditState(!editState);
        }}
      >
        <span>{editState?`Save`:`Edit`}</span>
      </button>
      <button className={styles.taskButton}>
        <span>Delete</span>
      </button>
    </div>
  );
};
