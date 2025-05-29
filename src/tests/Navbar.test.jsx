import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router";
const emptyProducts = [];
const nonEmptyProducts = [{ title: "New product added to cart", inCart: true }];
describe("Navbar", () => {
  it("Store and cart links are rendered", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
  it("Displaying number of products in cart", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <Navbar products={emptyProducts} />
      </MemoryRouter>,
    );
    // first render should be 0
    expect(screen.getByText("0")).toBeVisible();
    rerender(
      <MemoryRouter>
        <Navbar products={nonEmptyProducts} />
      </MemoryRouter>,
    );
    // pushed a product now should be 1
    expect(screen.getByText("1")).toBeVisible();
  });
});
