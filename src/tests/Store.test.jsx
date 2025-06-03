import { afterEach, describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Store from "../routes/Store";
import Cart from "../routes/Cart.jsx";
import userEvent from "@testing-library/user-event";
import { useOutletContext } from "react-router";
import useFilms from "../hooks/useFilms.js";
vi.mock("../hooks/useFilms.js");
vi.mock("react-router");
// setup values returned by useOutletContext & useFilms
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
  afterEach(() => {
    vi.clearAllMocks(); // Reset all mocked calls between tests
  });

  it("Store loading is displayed", () => {
    useFilms.mockReturnValue({
      products,
      error: false,
      loading: true,
      setProducts,
    });

    const { container } = render(<Store />);

    // displays "Loading..."
    expect(container).toMatchSnapshot();
  });

  it("Store displays products when useFilms returns products", async () => {
    useFilms.mockReturnValue({
      products,
      error: false,
      loading: false,
      setProducts,
    });
    render(<Store />);
    expect(await screen.findByText("some title")).toBeVisible();
  });
  it("Adding products to cart", async () => {
    useFilms.mockReturnValue({
      products,
      error: false,
      loading: false,
      setProducts,
    });
    useOutletContext.mockReturnValue([products, setProducts]);
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <Store />
        <Cart />
      </>,
    );
    const incrementButton = screen.getByTestId("increment-button");
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
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

  it("Doest add to cart if quantity is less than 1", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Store />
        <Cart />
      </>,
    );
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
    await user.click(addToCartBtn);
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("non-empty-cart")).toBe(null);
  });
  it("Display errors from api", async () => {
    const error = "some error";
    const loading = false;
    useFilms.mockReturnValue({ products, error, loading, setProducts });
    render(<Store />);
    expect(screen.getByTestId("api-error")).toBeInTheDocument();
  });
});
