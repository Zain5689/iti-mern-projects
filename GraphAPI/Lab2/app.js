const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./db.connection");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers/rootResolvers");
const { getUserFromContext } = require("./auth");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await getUserFromContext({ req });
    return { user, req };
  },
  introspection: true,
  playground: true,
});

// Start server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
