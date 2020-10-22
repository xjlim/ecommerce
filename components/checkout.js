import { useCart, useDispatchCart } from "./cartProvider";
import { formatPrice } from "../lib/utils";
import React from "react";
import Counter from "./counter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const promise = loadStripe(
  "pk_test_517GbKcFgBQK1UBBLs4hBNIPNWZPn7g9cn89ljfLCrrUWtYR5Zdf0aXiveSrftoopGRVYfw26M9C4ej2e6xh38goG005iChIgdt"
);

export default function Checkout() {
  const cartData = useCart();
  const dispatch = useDispatchCart();
  const updateQuantity = ({ id, name, price, quantity }) =>
    dispatch({
      type: "EDIT",
      payload: { id, name, price, quantity },
    });

  const handleRemove = (id) =>
    dispatch({
      type: "DELETE",
      payload: { id },
    });

  const cartTotal = cartData.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <div className="mb-16 flex flex-col justify-center items-center">
      <h4 className="m-1 p-2 text-3xl">Your cart</h4>
      <ul className="grid grid-flow-row grid-cols-4 gap-4">
        <li key="product">
          <h5>Product</h5>
        </li>
        <li key="price">
          <h5>Price</h5>
        </li>
        <li key="quantity">
          <h5>Quantity</h5>
        </li>
        <li key="total">
          <h5>Total</h5>
        </li>
        {cartData.map(({ id, name, price, quantity }) => (
          <React.Fragment key={id}>
            <li className="my-4">{name}</li>
            <li className="my-4">{formatPrice(price)}</li>
            <li>
              <Counter
                count={quantity}
                setCount={(count) =>
                  updateQuantity({ id, name, price, quantity: count })
                }
              />
            </li>
            <li className="my-4">
              {formatPrice(price * quantity)}
              <button
                onClick={() => handleRemove(id)}
                className="mx-8 font-mono font-semibold"
              >
                X
              </button>
            </li>
          </React.Fragment>
        ))}
      </ul>
      <div className="flex mt-10 w-8/12">
        <div className="w-3/5 mx-2 flex flex-col">
          <p>Please enter your payment details:</p>
          <p className="text-sm">
            Test using these Stripe test credit card numbers with any CVC,
            postal code, and expiration date in the future:
            <li>4242 4242 4242 4242</li>
            <li>
              4000 0027 6000 3184 (requires authentication, will trigger a
              pop-up)
            </li>
            <li>
              4000 0000 0000 9995 (will decline with a decline code of
              insufficient funds)
            </li>
          </p>
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
        </div>

        <div className="w-2/5 mx-2 grid grid-cols-2 grid-rows-3 gap-4">
          <div>Subtotal:</div>
          <div>{formatPrice(cartTotal)}</div>
          <div>Shipping:</div>
          <div>Free Shipping</div>
          <div>Total:</div>
          <div>{formatPrice(cartTotal)}</div>
        </div>
      </div>
    </div>
  );
}
