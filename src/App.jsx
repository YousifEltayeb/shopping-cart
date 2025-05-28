import "./styles/index.css";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { Outlet } from "react-router";
import Store from "./routes/Store";
import Cart from "./routes/Cart";
import Welcome from "./components/Welcome";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";

const App = () => {
  const [products, setProducts] = useState([]);
  return (
    <>
      <header>
        {" "}
        <Navbar products={products} />
      </header>
      <Routes>
        <Route path="/" element={<Outlet context={[products, setProducts]} />}>
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
export default App;
