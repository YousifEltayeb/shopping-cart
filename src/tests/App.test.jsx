import { beforeEach, afterEach, vi, describe, it, expect } from "vitest";
import { waitFor, render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";
import useFilms from "../hooks/useFilms.js";
vi.mock("../hooks/useFilms.js");
const setProducts = vi.fn();

describe("Navigating", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Reset all mocked calls between tests
  });
  it("full app rendering/navigating", async () => {
    const user = userEvent.setup();
    useFilms.mockReturnValue({
      products: [],
      error: false,
      loading: true,
      setProducts: setProducts,
    });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    // Test Welcome Is Rendered on "/"

    expect(
      await screen.findByRole("main", { name: "Welcome" }),
    ).toBeInTheDocument();
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
    // Loading element is displayed
    expect(screen.getByTestId("loading")).toBeInTheDocument();
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
  // it("Doest add to cart if quantity is less than 1", async () => {
  //   const user = userEvent.setup();
  //   render(
  //     <MemoryRouter>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   //navigate to store
  //   const storeLink = screen.getByRole("link", { name: "Store" });
  //   await user.click(storeLink);
  //   expect(screen.getByRole("main", { name: "Store" })).toBeInTheDocument();
  //   await waitFor(() => {
  //     const addToCartBtn = screen.getAllByTestId("add-to-cart-button");
  //     // try to add the first product without setting quantity
  //     user.click(addToCartBtn[0]);
  //     const productTitle =
  //       screen.getAllByTestId("product-title")[0].textContent;
  //     return productTitle;
  //   }).then(async (productTitle) => {
  //     // navigate to cart
  //     const cartLink = screen.getByRole("link", { name: "Cart" });
  //     expect(cartLink).toHaveAttribute("href", "/Cart");
  //     await user.click(cartLink);
  //     expect(screen.getByRole("main", { name: "Cart" })).toBeInTheDocument();
  //     expect(
  //       screen.queryByRole("main", { name: "Store" }),
  //     ).not.toBeInTheDocument();
  //     expect(screen.queryByText(productTitle)).toBe(null);
  //     expect(screen.getByTestId("empty-cart")).toBeVisible();
  //   });
  // });
  // it("Total amount is shown correctly", async () => {
  //   const user = userEvent.setup();
  //   render(
  //     <MemoryRouter>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   //navigate to store
  //   const storeLink = screen.getByRole("link", { name: "Store" });
  //   await user.click(storeLink);
  //   expect(screen.getByRole("main", { name: "Store" })).toBeInTheDocument();
  //   await screen
  //     .findAllByTestId("quantity-input", { timeout: 5000 })
  //     .then((inputFields) => {
  //       inputFields[0].value = 1;
  //       inputFields[1].value = 1;
  //       inputFields[2].value = 1;
  //     });
  //
  //   await screen
  //     .findAllByTestId("add-to-cart-button", { timeout: 5000 })
  //     .then((buttons) => {
  //       user.click(buttons[0]);
  //       user.click(buttons[1]);
  //       user.click(buttons[2]);
  //     });
  //   // navigate to cart
  //   const cartLink = screen.getByRole("link", { name: "Cart" });
  //   expect(cartLink).toHaveAttribute("href", "/Cart");
  //   await user.click(cartLink);
  //   expect(screen.getByRole("main", { name: "Cart" })).toBeInTheDocument();
  //   expect(
  //     screen.queryByRole("main", { name: "Store" }),
  //   ).not.toBeInTheDocument();
  //   const total = await screen.findByTestId("total", { timeout: 5000 });
  //   expect(total.textContent).toBe("60$");
  // });
});
