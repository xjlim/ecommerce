import Link from "next/link";
import cn from "classnames";
import { useCart } from "./cartProvider";
import Checkout from './checkout';

const SHOPPING_STEP = "shopping_step";
const CHECKOUT_STEP = "checkout_step";
const ORDER_COMPLETE_STEP = "order_complete_step";

function Detail({ step }) {
  let detail;
  if (step === SHOPPING_STEP) {
    detail = (
      <div className="mb-16 flex flex-col justify-center items-center">
        <h4 className="m-1 p-2 text-3xl">Your cart</h4>
        <p className="m-1 p-2 font-light">Your cart is empty, fill it up!</p>
        <Link href="/">
          <button className="m-1 px-4 py-2 bg-black text-white hover:bg-orange-500">
            Back Home
          </button>
        </Link>
      </div>
    );
  } else if (step === CHECKOUT_STEP) {
    detail = <Checkout />;
  } else {
    // order complete
    detail = (
      <div className="mb-16 flex flex-col justify-center items-center">
        <h4 className="m-1 p-2 text-3xl">Your cart</h4>
        <p className="m-1 p-2 text-xl">Success!</p>
        <p className="m-1 p-2 font-light">
          Thank you for your purchase. You 'll be receiving your items in 4
          business days.
        </p>
        <p className="m-1 p-2 font-light">Forgot something?</p>
        <Link href="/">
          <button className="m-1 px-4 py-2 bg-black text-white hover:bg-orange-500">
            Back Home
          </button>
        </Link>
      </div>
    );
  }
  return detail;
}

export default function Cart() {
  const cartData = useCart();

  const buttonStyle = (toggle) =>
    cn(
      "rounded-full h-16 w-16 flex items-center justify-center border-solid border-2 border-gray-500",
      {
        "bg-orange-600 text-white": toggle,
        "bg-white text-black": !toggle,
      }
    );

  let step;
  if (cartData && cartData.length > 0) {
    step = CHECKOUT_STEP;
  } else {
    step = SHOPPING_STEP;
  }
  return (
    <div className="mx-24">
      <ul className="flex align-center justify-center">
        <li className="px-16 py-8">
          <div className={buttonStyle(step === SHOPPING_STEP)}>01</div>
          <h4>Shopping Cart</h4>
        </li>
        <li className="px-16 py-8">
          <div className={buttonStyle(step === CHECKOUT_STEP)}>02</div>
          <h4>Check Out</h4>
        </li>
        <li className="px-16 py-8">
          <div className={buttonStyle(step === ORDER_COMPLETE_STEP)}>03</div>
          <h4>Order Complete</h4>
        </li>
      </ul>
      <hr />
      <Detail step={step} />
    </div>
  );
}
