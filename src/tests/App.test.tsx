import { afterEach, vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Navigating", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Reset all mocked calls between tests
  });
  it("full app rendering/navigating", async () => {
    const user = userEvent.setup();
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
      screen.queryByRole("main", { name: "Cart" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("main", { name: "Store" }),
    ).not.toBeInTheDocument();

    // Store is Rendered when Store link is clicked

    const storeLink = screen.getByRole("link", { name: "Store" });
    expect(storeLink).toHaveAttribute("href", "/Store");
    await user.click(storeLink);
    expect(screen.getByRole("main", { name: "Store" })).toBeInTheDocument();
    expect(
      screen.queryByRole("main", { name: "Cart" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("main", { name: "Welcome" }),
    ).not.toBeInTheDocument();
    // Loading element is displayed
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    // Cart is Rendered when Cart link is clicked
    const cartLink = screen.getByRole("link", { name: "Cart" });
    expect(cartLink).toHaveAttribute("href", "/Cart");

    await user.click(cartLink);

    expect(screen.getByRole("main", { name: "Cart" })).toBeInTheDocument();
    expect(
      screen.queryByRole("main", { name: "Store" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("main", { name: "Welcome" }),
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
