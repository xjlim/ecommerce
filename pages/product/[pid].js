import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Counter from "../../components/counter";
import { useDispatchCart } from "../../components/cartProvider";
import { formatPrice } from "../../lib/utils";

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
  const dispatch = useDispatchCart();
  const [count, setCount] = useState(0);
  const { pid } = router.query;
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      id: pid,
    },
    ssr: false,
    skip: pid === undefined
  });

  console.log("data", data);
  console.log("error", error);

  if (error) return "An error has occurred.";
  if (!pid || loading) return "Loading...";

  const { id, img, name, description, price } = data.products[0];

  const handleClick = () =>
    dispatch({
      type: "ADD",
      payload: {
        id,
        name,
        price,
        quantity: count,
      },
    });

  return (
    <div>
      <Header />
      <div className="flex mx-24 ">
        <div className="w-1/5 m-6">
          <img className="w-48 h-48" src={`/products/${img}`} alt={name} />
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
          <Counter count={count} setCount={setCount} />
          <button
            className="my-4 w-32 h-12 bg-orange-500 text-white hover:bg-orange-800"
            onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
        <div className="w-1/5"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
