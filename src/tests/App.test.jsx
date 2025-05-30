import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";
describe("Navigating", () => {
  it("full app rendering/navigating", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    // Test Welcome Is Rendered on "/"

    expect(screen.getByRole("main", { name: "Welcome" })).toBeInTheDocument();
    expect(
      screen.queryByLabelText("main", { name: "Cart" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("main", { name: "Store" }),
    ).not.toBeInTheDocument();

    // Store is Rendered when Store link is clicked

    const storeLink = screen.getByRole("link", { name: "Store" });
    expect(storeLink).toHaveAttribute("href", "/Store");
    await user.click(storeLink);
    expect(screen.getByRole("main", { name: "Store" })).toBeInTheDocument();
    expect(
      screen.queryByLabelText("main", { name: "Cart" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("main", { name: "Welcome" }),
    ).not.toBeInTheDocument();

    // Cart is Rendered when Cart link is clicked
    const cartLink = screen.getByRole("link", { name: "Cart" });
    expect(cartLink).toHaveAttribute("href", "/Cart");

    await user.click(cartLink);

    expect(screen.getByRole("main", { name: "Cart" })).toBeInTheDocument();
    expect(
      screen.queryByLabelText("main", { name: "Store" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("main", { name: "Welcome" }),
    ).not.toBeInTheDocument();
  });
  it("Landing on a bad page", async () => {
    const badRoute = "/bad/route";
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("main", { name: "ErrorPage" })).toBeInTheDocument();
  });
  it("Renders products in cart after adding adding to cart", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const storeLink = screen.getByRole("link", { name: "Store" });
    await user.click(storeLink);
    expect(screen.getByRole("main", { name: "Store" })).toBeInTheDocument();
    // add the first product to cart
    const products = await screen.findAllByTestId("product-card");
    const inputField = products[0].querySelector("input");
    inputField.value = 1;
    const addToCartBtn = products[0].querySelector(
      "[data-testid='add-to-cart-button']",
    );
    await user.click(addToCartBtn);
    const navbar = screen.getByRole("navigation");
    console.log(navbar);
  });
});
