import { describe, it, expect, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router";
import { useProducts } from "../hooks/useFilms";
vi.mock("../hooks/useFilms", () => ({
  useProducts: vi.fn(),
}));
// interface Product {
//   id: number;
//   title: string;
//   posterPath: string;
//   inCart: boolean;
//   price: number;
//   quantity: number;
// }
// const emptyProducts: Product[] = [];
// const nonEmptyProducts = [{ title: "New product added to cart", inCart: true }];
describe("Navbar", () => {
  const mockedUseProducts = useProducts as Mock;
  beforeEach(() => {
    mockedUseProducts.mockReturnValue({
      products: [],
    });
    vi.clearAllMocks(); // Reset all mocked calls between tests
  });
  it("Store and cart links are rendered", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
  it("Display 0 when there is a no product in cart", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    // first render should be 0
    expect(screen.getByText("0")).toBeVisible();
  });
  it("Display 1 when there is a product in cart", () => {
    mockedUseProducts.mockReturnValue({
      products: [{ title: "New product added to cart", inCart: true }],
    });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    // pushed a product now should be 1
    expect(screen.getByText("1")).toBeVisible();
  });
});
