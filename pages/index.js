import Header from "../components/header";
import Footer from "../components/footer";

export default function IndexPage() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex flex-col">
          <div className="mt-10 mb-5 ml-56 text-2xl text-orange-500">Men Shoes</div>
          <div className="my-5 ml-64 text-3xl">Collection</div>
          <div className="my-5 ml-56 font-light text-xs">STREET STYLE NEW FASHION</div>
        </div>
        <img
          className="bg-no-repeat bg-cover w-1/2"
          src="/shoe1.jpg"
          alt="shoe"
        />
      </div>
      <Footer />
    </div>
  );
}
