import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Footer from "../../components/footer";

function formatPrice(price) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return formatter.format(price);
}

const PRODUCT_QUERY = gql`
  query products($id: String!) {
    products(id: $id) {
      id
      img
      price
      name
      description
      color
    }
  }
`;
const Product = () => {
  const router = useRouter();
  const { pid: id } = router.query;

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      id,
    },
  });
  console.log("data", data);
  console.log("error", error);
  if (error) return "An error has occurred.";
  if (loading) return "Loading...";

  const { img, name, description, color, price } = data.products[0];
  return (
    <div>
      <Header />
      <div className="flex mx-24 ">
        <div className="w-1/5 m-6">
          <img className="w-48 h-48" src={`/products/${img}`} />
        </div>
        <div className="w-3/5 p-6 m-6 flex flex-col" key={id}>
          <div>{name}</div>
          <div className="m-1">{formatPrice(price)}</div>

          <p className="w-5/6">{description}</p>
          <br />
          <p className="w-5/6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            perferendis distinctio. Tempore, atque ipsam rerum, magnam
            voluptatem soluta cum id eos quod similique accusantium quos
            possimus. Quas aliquam fuga ipsum!
          </p>
        </div>
        <div className="w-1/5"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
