import { beforeEach, describe, it, expect, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { useProducts } from "../hooks/useFilms";
import { MemoryRouter } from "react-router";
import Cart from "../routes/Cart";
vi.mock("../hooks/useFilms", () => ({
  useProducts: vi.fn(),
}));
describe("Cart tests", () => {
  const mockedUseProducts = useProducts as Mock;
  beforeEach(() => {
    vi.clearAllMocks(); // Reset all mocked calls between tests
  });
  it("Empty cart displays empty-cart element", async () => {
    const products = [
      {
        inCart: false,
      },
    ];

    mockedUseProducts.mockReturnValue({
      products,
    });
    const { container } = render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
  it("Display products in cart", async () => {
    const products = [
      {
        id: 0,
        title: "Sprited Away",
        posterPath: "sprit.jpg",
        inCart: true,
        price: 20,
        quantity: 1,
      },
      {
        id: 1,
        title: "The Wild Robot",
        posterPath: "robot.jpg",
        inCart: true,
        price: 20,
        quantity: 2,
      },
      {
        id: 2,
        title: "Lion King",
        posterPath: "lion.jpg",
        inCart: true,
        price: 20,
        quantity: 1,
      },
    ];
    mockedUseProducts.mockReturnValue({ products });
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
    // total should be 80
    expect(screen.getByTestId("total").textContent).toBe("80$");
    // film titles should be in the document
    expect(screen.getByText("Lion King")).toBeInTheDocument();
    expect(screen.getByText("The Wild Robot")).toBeInTheDocument();
    expect(screen.getByText("Sprited Away")).toBeInTheDocument();
    // posters should be displayed
    expect(screen.getByAltText("Lion King poster")).toBeInTheDocument();
    expect(screen.getByAltText("The Wild Robot poster")).toBeInTheDocument();
    expect(screen.getByAltText("Sprited Away poster")).toBeInTheDocument();
  });
});
