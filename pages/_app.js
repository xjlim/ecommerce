import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { CartProvider } from "../components/cartProvider";
import "../styles/index.css";
import "../styles/stripe.css";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ApolloProvider>
  );
}
