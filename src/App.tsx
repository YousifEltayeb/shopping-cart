import "./styles/index.css";
import { Routes, Route } from "react-router";
import Store from "./routes/Store";
import Cart from "./routes/Cart";
import Welcome from "./components/Welcome";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProductsProvidor } from "./hooks/useFilms";

const App = () => {
  return (
    <>
      <ProductsProvidor>
        <header>
          {" "}
          <Navbar />
        </header>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="Store" element={<Store />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </ProductsProvidor>
    </>
  );
};
export default App;
