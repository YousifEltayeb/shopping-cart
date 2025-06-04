import { beforeEach, describe, it, expect, vi } from "vitest";
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
describe("Store", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset all mocked calls between tests
  });

  it("Store loading is displayed", () => {
    useOutletContext.mockReturnValue([[], vi.fn()]);
    useFilms.mockReturnValue({
      products: [],
      error: false,
      loading: true,
      setProducts,
    });

    const { container } = render(<Store />);

    // displays "Loading..."
    expect(container).toMatchSnapshot();
  });

  it("Store displays products when useFilms returns products", async () => {
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
    useFilms.mockReturnValue({
      products,
      error: false,
      loading: false,
      setProducts,
    });
    useOutletContext.mockReturnValue([products, vi.fn()]);
    render(<Store />);
    expect(await screen.findByText("some title")).toBeVisible();
  });
  it("Adding products to cart", async () => {
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
    useFilms.mockReturnValue({
      products,
      error: false,
      loading: false,
      setProducts,
    });
    useOutletContext.mockReturnValue([products, vi.fn()]);
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

    useFilms.mockReturnValue({
      products,
      error: false,
      loading: false,
      setProducts,
    });
    useOutletContext.mockReturnValue([products, vi.fn()]);
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <Store />
        <Cart />
      </>,
    );

    // quantity is = 0 by default
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
    await user.click(addToCartBtn);

    // rerender to make sure cart is updated
    rerender(
      <>
        <Store />
        <Cart />
      </>,
    );
    // nothing should be in the cart
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("non-empty-cart")).toBe(null);
  });
  it("Increment buttons work correclty", async () => {
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
    useFilms.mockReturnValue({
      products,
      error: false,
      loading: false,
      setProducts,
    });
    useOutletContext.mockReturnValue([products, vi.fn()]);
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <Store />
        <Cart />
      </>,
    );
    // click increment twice
    const incrementButton = screen.getByTestId("increment-button");
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(addToCartBtn);
    rerender(
      <>
        <Store />
        <Cart />
      </>,
    );
    expect(screen.getByTestId("product-quantity").textContent).toBe("2x");
    // 1 item is 20
    expect(screen.getByTestId("total").textContent).toBe("40$");
  });
  it("Decrement buttons work correclty", async () => {
    const products = [
      {
        id: 1,
        title: "some title",
        posterPath: "some/path",
        inCart: false,
        price: 20,
        quantity: 2,
      },
    ];
    useFilms.mockReturnValue({
      products,
      error: false,
      loading: false,
      setProducts,
    });
    useOutletContext.mockReturnValue([products, vi.fn()]);
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <Store />
        <Cart />
      </>,
    );
    // click increment twice
    // Quantity is 2 by default in this test
    const decrementButton = screen.getByTestId("decrement-button");
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(addToCartBtn);
    rerender(
      <>
        <Store />
        <Cart />
      </>,
    );
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("non-empty-cart")).toBe(null);
  });
  it("Display errors from api", async () => {
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
    useFilms.mockReturnValue({
      products,
      error: "some error",
      loading: false,
      setProducts,
    });
    render(<Store />);
    expect(screen.getByTestId("api-error")).toBeInTheDocument();
  });
});
