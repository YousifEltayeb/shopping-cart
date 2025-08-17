import "./styles/index.css";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { Outlet, useOutletContext } from "react-router";
import Store from "./routes/Store";
import Cart from "./routes/Cart";
import Welcome from "./components/Welcome";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
interface Product {
  id: number;
  title: string;
  posterPath: string;
  inCart: boolean;
  price: number;
  quantity: number;
}
type ContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};
const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  return (
    <>
      <header>
        {" "}
        <Navbar context={products} />
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Outlet context={{ products, setProducts } satisfies ContextType} />
          }
        >
          <Route index element={<Welcome />} />
          <Route path="Store" element={<Store />} />
          <Route path="Cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
};
export function useProducts() {
  return useOutletContext<ContextType>();
}
export default App;
