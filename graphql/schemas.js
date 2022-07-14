import { gql } from "@apollo/client";

const schemas = gql`

  type Task {
    id: Int!
    taskDescription: String!
    dueDate: String!
    priority: String!
    completed: Boolean
  }

  type Query {
    test: String
    getTask(id: Int!): Task
    allTasks: [Task!]!
  }
  
  type Mutation {
    createTask(
      taskDescription: String!
      priority: String!
      dueDate: String!
    ): Task!
    deleteTask(id: Int!): Task!
    updateTask(
      id:Int!
      taskDescription: String!
      priority: String!
      dueDate: String! 
    ):Task!
  }
`;

export default schemas;
