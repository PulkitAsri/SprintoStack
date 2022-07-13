import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
  {
    allTasks {
      taskDescription
      dueDate
      id
      priority
      completed
    }
  }
`;

export const CREATE_TASK = gql`
  mutation ($taskDescription: String!, $priority: String!, $dueDate: String!) {
    createTask(
      taskDescription: $taskDescription
      priority: $priority
      dueDate: $dueDate
    ) {
      id
      priority
      taskDescription
      dueDate
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($deleteTaskId: Int!) {
    deleteTask(id: $deleteTaskId) {
      id
      taskDescription
      dueDate
      priority
      completed
    }
  }
`;
