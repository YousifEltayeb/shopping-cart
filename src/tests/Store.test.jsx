import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Store from "../routes/Store";
import { Routes, Route, MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { useOutletContext } from "react-router";
// const setProducts = vi.fn();
// vi.mock("react-router", async () => ({
//   ...vi.importActual("react-router"),
//   useOutletContext: () => vi.fn(),
// }));
vi.mock("react-router");
const products = [
  {
    id: 1,
    title: "some title",
    posterPath: "some/path",
    inCart: false,
    price: 20,
    quantity: 1,
  },
];
const setProducts = vi.fn();
describe("Store", () => {
  it("Store is loading", () => {
    const emptyProducts = [];
    useOutletContext.mockReturnValue([emptyProducts]);
    const { container } = render(<Store />);

    expect(container).toMatchSnapshot();
  });

  it("Clicking add to cart and increment updates proprties correctly", async () => {
    useOutletContext.mockReturnValue([products, setProducts]);
    const user = userEvent.setup();
    render(<Store />);

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(products[0]).toEqual({ ...products[0], quantity: 1, inCart: true });
  });
  it("It doesn't update inCart or quantity");
});
