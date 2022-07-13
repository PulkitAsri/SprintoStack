import { gql, ApolloServer } from "apollo-server-micro";
import dummyData from "../../constants";
import Cors from "micro-cors";
import models from "./models";

let taskList = dummyData;

const typeDefs = gql`
  # enum PriorityLevel {
  #   HIGH
  #   MEDIUM
  #   LOW
  # }
  type Task {
    id: Int!
    taskDescription: String!
    dueDate: String!
    priority: String!
    completed: Boolean!
  }

  type Query {
    getTask(id: Int!): Task!
    allTasks: [Task!]!
  }
  type Mutation {
    createTask(
      taskDescription: String!
      priority: String!
      dueDate: String!
    ): Task!
  }

  type Query {
    test: String
  }
`;

const resolvers = {
  Query: {
    getTask: (_parent, {id}, {models}) => {
      // return models.Task.findAll()
      return models.Task.findOne({ where: { id } });
    },
    allTasks: (_parent, { id }, { models }) => {
      // return taskList
      return models.Task.findAll();
    },
    test: (_parent, _args, _context) => "Hi There This is a test",
  },

  Mutation: {
    createTask: (_parent, _args, {models}) => {
      // taskList.push({
      //   taskDescription:taskDescription,
      //   priority:priority,
      //   dueDate:dueDate,
      // })
      return models.Task.create(_args);
    },
    // editTask: (_parent, { id, text }, _context) => {
    //   // return prisma.blogPost.update({ where: { id }, data: { text } });
    // },
    // deleteTask: (_parent, { id }, _context) => {
    //   // return prisma.blogPost.delete({ where: { id } });
    // },
  },
};

const cors = Cors();

export const config = { api: { bodyParser: false } };

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    task: {
      id: 1,
    },
  },
});

// const handler = apolloServer.createHandler({ path: "/api/graphql" });
const startServer = apolloServer.start();
export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await models.sequelize.sync();
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

// export default handler;
