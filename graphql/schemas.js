import { gql } from "@apollo/client";

const schemas = gql`
  type Task {
    id: Int!
    taskDescription: String!
    dueDate: String!
    priority: String!
    completed: Boolean
    userId: Int!
  }
  type User {
    id: Int!
    userName: String!
    email: String!
  }

  type Query {
    test: String
    getTask(id: Int!): Task
    allTasks: [Task!]!
    allUsers: [User!]!
  }

  type Mutation {
    createTask(
      taskDescription: String!
      priority: String!
      dueDate: String!
      userId: Int!
    ): Task!
    deleteTask(id: Int!): Task!
    updateTask(
      id: Int!
      taskDescription: String!
      priority: String!
      dueDate: String!
    ): Task!

    createUser(userName: String!, email: String!): User!
  }
`;

export default schemas;
