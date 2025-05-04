import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./routes/root";
import Store from "./routes/Store";
import Cart from "./routes/Cart";
import Welcome from "./components/Welcome";
import ErrorPage from "./components/ErrorPage";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route index element={<Welcome />} />
                    <Route path="Store" element={<Store />} />
                    <Route path="Cart" element={<Cart />} />
                </Route>
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
