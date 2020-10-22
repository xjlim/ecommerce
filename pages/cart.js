import Header from "../components/header";
import Footer from "../components/footer";
import Cart from "../components/cart";
import { CheckoutStatusProvider } from "../components/checkoutStatusProvider";

export default function CartPage() {
  return (
    <div>
      <Header />
      <CheckoutStatusProvider>
        <Cart />
      </CheckoutStatusProvider>
      <Footer />
    </div>
  );
}
