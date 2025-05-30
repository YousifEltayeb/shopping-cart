import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Store from "../routes/Store";
import Cart from "../routes/Cart.jsx";
import userEvent from "@testing-library/user-event";
import { useOutletContext } from "react-router";
import useFilms from "../hooks/useFilms.js";
vi.mock("../hooks/useFilms.js");
vi.mock("react-router");
// setup values returned by useOutletContext & useFilms
const emptyProducts = [];
const setProducts = vi.fn();
const products = [
  {
    id: 1,
    title: "some title",
    posterPath: "some/path",
    inCart: false,
    price: 20,
    quantity: 0,
  },
];
describe("Store", () => {
  it("Store loading is displayed", () => {
    const loading = true;
    const error = false;
    useFilms.mockReturnValue({ emptyProducts, error, loading, setProducts });
    const { container } = render(<Store />);

    // displays "Loading..."
    expect(container).toMatchSnapshot();
  });

  it("Store displays products when useFilms returns products", async () => {
    const error = false;
    const loading = false;
    useFilms.mockReturnValue({ products, error, loading, setProducts });
    render(<Store />);
    expect(await screen.findByText("some title")).toBeVisible();
  });
  it("Adding products to cart", async () => {
    const error = false;
    const loading = false;
    useFilms.mockReturnValue({ products, error, loading, setProducts });
    useOutletContext.mockReturnValue([products, setProducts]);
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <Store />
        <Cart />
      </>,
    );
    const incrementButton = screen.getByRole("button", { name: "+" });
    const addToCartBtn = screen.getByRole("button", { name: "Add to cart" });
    await user.click(incrementButton);
    // disaply cart is empty before adding a product to cart
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("non-empty-cart")).toBe(null);
    await user.click(addToCartBtn);
    rerender(
      <>
        <Store />
        <Cart />
      </>,
    );
    // display the element with the products in the cart
    expect(screen.getByTestId("non-empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-cart")).toBe(null);
  });

  it("Display errors from api", async () => {
    const error = "some error";
    const loading = false;
    useFilms.mockReturnValue({ products, error, loading, setProducts });
    render(<Store />);
    expect(screen.getByTestId("api-error")).toBeInTheDocument();
  });
});
