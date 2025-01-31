import Header from "../components/header";
import Footer from "../components/footer";
import Store, { ALL_PRODUCTS_QUERY } from "../components/store";
import { initializeApollo } from "../lib/apolloClient";

export default function WomenPage() {
  return (
    <div>
      <Header />
      <Store type="women" />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      type: "women",
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}
