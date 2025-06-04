import { afterEach, vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
