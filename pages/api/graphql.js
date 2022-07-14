import { ApolloServer } from "apollo-server-micro";
import dummyData from "../../constants";
import Cors from "micro-cors";
import models from "../../models";
import schemas from "../../graphql/schemas";
import resolvers from "../../graphql/resolvers";

// let taskList = dummyData;

const typeDefs = schemas;

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
