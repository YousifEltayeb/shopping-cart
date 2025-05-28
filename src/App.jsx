import "./styles/index.css";
import { Routes, Route } from "react-router";
import Root from "./routes/root";
import Store from "./routes/Store";
import Cart from "./routes/Cart";
import Welcome from "./components/Welcome";
import ErrorPage from "./components/ErrorPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Welcome />} />
        <Route path="Store" element={<Store />} />
        <Route path="Cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};
export default App;
