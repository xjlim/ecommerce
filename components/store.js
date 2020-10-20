import { gql, useQuery } from "@apollo/client";

export const ALL_PRODUCTS_QUERY = gql`
  query products($type: String!) {
    products(type: $type) {
      gender
      id
      color
      description
      name
      review
      starrating
      price
      img
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
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <div className="flex mx-24 justify-center">
        <div className="w-3/4 grid grid-flow-row grid-cols-3 gap-4">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
        </div>
        <div className="w-1/4">
          <h4>Special Sale</h4>
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
