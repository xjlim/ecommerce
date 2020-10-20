import { ApolloServer, gql } from "apollo-server-micro";
import data from "../../public/storedata.json";

const typeDefs = gql`
  type Product {
    id: String!
    color: String!
    description: String!
    gender: String!
    name: String!
    review: String!
    starrating: String!
    price: String!
    img: String!
  }

  type Query {
    products(type: String, price: String): [Product!]!
  }
`;

const resolvers = {
  Query: {
    products(parent, args, context) {
      const type = args.type.toLowerCase();
      const price = args.price;
      let result;
      switch (type) {
        case "all":
          result = data;
          console.log("all", result);
          break;
        case "men":
          result = data.filter((x) => x.gender.toLowerCase() === "male");
          console.log("men", result);
          break;
        case "women":
          result = data.filter((x) => x.gender.toLowerCase() === "female");
          console.log("women", result);
          break;
        default:
          result = [];
          break;
      }
      return result;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
