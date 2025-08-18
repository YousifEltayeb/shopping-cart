import { beforeEach, describe, it, expect, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import Store from "../routes/Store";
import Cart from "../routes/Cart";
import userEvent from "@testing-library/user-event";
import { useProducts } from "../hooks/useFilms";
import { MemoryRouter } from "react-router";
import { reducer } from "../utils/productsReducer";

vi.mock("../hooks/useFilms", () => ({
  useProducts: vi.fn(),
}));

describe("Store", () => {
  const mockedUseProducts = useProducts as Mock;
  beforeEach(() => {
    vi.clearAllMocks(); // Reset all mocked calls between tests

    let products = [
      {
        id: 1,
        title: "some title",
        posterPath: "some/path",
        inCart: false,
        price: 20,
        quantity: 0,
      },
    ];

    mockedUseProducts.mockReturnValue({
      products,
      error: null,
      loading: false,
      dispatch: vi.fn((action) => {
        products = reducer(products, action);
      }),
    });
  });

  it("Store loading is displayed", () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      error: null,
      loading: true,
    });

    const { container } = render(<Store />);

    // displays "Loading..."
    expect(container).toMatchSnapshot();
  });

  it("Store displays products when useFilms returns products", async () => {
    render(
      <MemoryRouter>
        <Store />
      </MemoryRouter>,
    );
    expect(await screen.findByText("some title")).toBeVisible();
  });
  it("Adding products to cart", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <MemoryRouter>
        <Store />
        <Cart />
      </MemoryRouter>,
    );
    const incrementButton = screen.getByTestId("increment-button");
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
    await user.click(incrementButton);
    // disaply cart is empty before adding a product to cart
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("non-empty-cart")).toBe(null);
    await user.click(addToCartBtn);
    rerender(
      <MemoryRouter>
        <Store />
        <Cart />
      </MemoryRouter>,
    );
    // display the element with the products in the cart
    expect(screen.getByTestId("non-empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-cart")).toBe(null);
  });

  it("Doesnt add to cart if quantity is less than 1", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <MemoryRouter>
        <Store />
        <Cart />
      </MemoryRouter>,
    );

    // quantity is = 0 by default
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
    await user.click(addToCartBtn);

    // rerender to make sure cart is updated
    rerender(
      <MemoryRouter>
        <Store />
        <Cart />
      </MemoryRouter>,
    );
    // nothing should be in the cart
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("non-empty-cart")).toBe(null);
  });
  it("Increment buttons work correclty", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <MemoryRouter>
        <Store />
        <Cart />
      </MemoryRouter>,
    );
    // click increment twice
    const incrementButton = screen.getByTestId("increment-button");
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(addToCartBtn);
    rerender(
      <MemoryRouter>
        <Store />
        <Cart />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("product-quantity").textContent).toBe("2x");
    // 1 item is 20
    expect(screen.getByTestId("total").textContent).toBe("40$");
  });
  it("Decrement buttons work correclty", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <MemoryRouter>
        <Store />
        <Cart />
      </MemoryRouter>,
    );
    // click increment twice
    // Quantity is 2 by default in this test
    const decrementButton = screen.getByTestId("decrement-button");
    const addToCartBtn = screen.getAllByTestId("add-to-cart-button")[0];
    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(addToCartBtn);
    rerender(
      <MemoryRouter>
        <Store />
        <Cart />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("non-empty-cart")).toBe(null);
  });
  it("Display errors from api", async () => {
    mockedUseProducts.mockReturnValue({
      error: "some error",
    });
    render(<Store />);
    expect(screen.getByTestId("api-error")).toBeInTheDocument();
  });
});
