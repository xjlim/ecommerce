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
    products(type: String, price: String, id: String): [Product!]!
  }
`;

const resolvers = {
  Query: {
    products(parent, args, context) {
      const type = args.type;
      const id = args.id;
      const price = args.price;

      if (id) {
        return data.filter((x) => x.id.toLowerCase() === id.toLowerCase());
      }

      let result;
      switch (type.toLowerCase()) {
        case "all":
          result = data;
          break;
        case "men":
          result = data.filter((x) => x.gender.toLowerCase() === "male");
          break;
        case "women":
          result = data.filter((x) => x.gender.toLowerCase() === "female");
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
