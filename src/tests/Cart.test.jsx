import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart from "../routes/Cart";
import { useOutletContext } from "react-router";
vi.mock("react-router");
describe("Cart tests", () => {
  it("Empty cart displays empty-cart element", async () => {
    useOutletContext.mockReturnValue([[]]);

    const { container } = render(<Cart />);
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
    useOutletContext.mockReturnValue([products]);
    render(<Cart />);
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
