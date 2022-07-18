import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
  {
    allTasks {
      id
      taskDescription
      dueDate
      priority
      completed
    }
    allUsers {
      id
      userName
      email
    }
  }
`;

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
  mutation (
    $taskDescription: String!
    $priority: String!
    $dueDate: String!
    $userId: Int!
  ) {
    createTask(
      taskDescription: $taskDescription
      priority: $priority
      dueDate: $dueDate
      userId: $userId
    ) {
      id
      priority
      taskDescription
      dueDate
      completed
      userId
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

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: Int!
    $taskDescription: String!
    $priority: String!
    $dueDate: String!
  ) {
    updateTask(
      id: $id
      taskDescription: $taskDescription
      priority: $priority
      dueDate: $dueDate
    ) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($userName: String!, $email: String!) {
    createUser(userName: $userName, email: $email) {
      id
      userName
      email
    }
  }
`;
