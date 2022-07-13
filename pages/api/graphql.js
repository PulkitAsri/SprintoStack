import { gql, ApolloServer } from "apollo-server-micro";
import dummyData from "../../constants";
import Cors from "micro-cors";
import models from "./models";

// let taskList = dummyData;

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
    deleteTask(id:Int!): Task!
    # updateTask()

  }
`;

const resolvers = {
  Query: {
    getTask: async (_parent, { id }, { models }) => {
      const thatTask = await models.Task.findOne({ where: { id } });
      return thatTask;
    },
    allTasks: async (_parent, { id }, { models }) => {
      const taskList = await models.Task.findAll();
      return taskList;
    },
    // test: (_parent, _args, _context) => "Hi There This is a test",
  },

  Mutation: {
    createTask: async (_parent, _args, { models }) => {
      const newUser = await models.Task.create(_args);
      return newUser;
    },
    // editTask: (_parent, { id, text }, _context) => {
    //   // return prisma.blogPost.update({ where: { id }, data: { text } });
    // },
    deleteTask: async (_parent, { id }, _context) => {
      const deletedTask = await models.Task.findOne({ where: { id } });
      await models.Task.destroy({
        where: { id },
      });
      return deletedTask;
    },
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
