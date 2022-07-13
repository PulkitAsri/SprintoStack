import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { DELETE_TASK } from "../graphql/queries";
import styles from "../styles/Home.module.css";

const priorityColors={
  "HIGH": 'red',
  "MEDIUM": 'yellow',
  "LOW": 'green'
}

export const TodoTask = ({taskData}) => {

  const [editState, setEditState] = useState(false);

  const [deleteTask]= useMutation(DELETE_TASK,{
    onCompleted: (data)=> window.location.reload()
  });

  const handleDelete=(e)=>{
    e.preventDefault();
    console.log(taskData.id);
    deleteTask({variables:{deleteTaskId: taskData.id}});
  }

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
      <button className={styles.taskButton} onClick={handleDelete}>
        <span>Delete</span>
      </button>
    </div>
  );
};
