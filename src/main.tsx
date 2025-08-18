import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { ProductsProvidor } from "./hooks/useFilms";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ProductsProvidor>
        <App />
      </ProductsProvidor>
    </BrowserRouter>
  </StrictMode>,
);
