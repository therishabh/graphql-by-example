import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = `#graphql
    type Query {
        greeting: String
    }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello Rishabh",
  },
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  const { url } = await server.listen({ port: process.env.PORT || 4040 });
  console.log(`\n🚀 Server ready at ${url}`);
};

startServer();
