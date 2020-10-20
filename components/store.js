import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

function formatPrice(price) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return formatter.format(price);
}

export const ALL_PRODUCTS_QUERY = gql`
  query products($type: String!) {
    products(type: $type) {
      id
      img
      price
      name
    }
  }
`;

export default function Store({ type }) {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      type,
    },
  });
  console.log("data", data);
  console.log("error", error);
  if (error) return "An error has occurred.";
  if (loading) return "Loading...";

  return (
    <>
      <div className="flex mx-24 my-6 justify-center">
        <div className="w-3/4 grid grid-flow-row grid-cols-3 gap-4">
          {data.products.map(({ id, img, price, name }) => (
            <div
              className="flex flex-col justify-center items-center p-4"
              key={id}
            >
              <img className="w-48 h-48" src={`/products/${img}`} />
              <div>{name}</div>
              <div className="m-1">{formatPrice(price)}</div>
              <Link href={`/product/${id}`}>
                <button className=" border-solid border-2 border-gray-900 border-opacity-50 hover:bg-black hover:text-white py-1 px-4">
                  View Item
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-1/4 m-8">
          <h4 className="my-4">Special Sale</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            magnam nihil voluptatum, odio, architecto temporibus nemo, ullam
            voluptate quisquam ipsa est eaque. Quaerat impedit, suscipit nihil
            amet neque officia porro.
          </p>
        </div>
      </div>
    </>
  );
}
