import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import Store from "../routes/Store";
import Cart from "../routes/Cart";
import { Routes, Route, MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
const products = [];
const setProducts = vi.fn();
describe("Navbar", () => {
  it("Store and cart links are rendered", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
  it("renders Welcome when user clicks Home link", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/", "/Store"]}>
        <Navbar products={products} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/Store"
            element={<Store context={[products, setProducts]} />}
          />
        </Routes>
      </MemoryRouter>,
    );
    const storeLink = screen.getByRole("link", { name: "Store" });
    expect(storeLink).toHaveAttribute("href", "/Store");

    const rootLink = screen.getByRole("link", { name: "Home" });
    expect(rootLink).toHaveAttribute("href", "/");

    // Switch from /Store to root
    await user.click(storeLink);
    await user.click(rootLink);

    expect(screen.getByRole("main", { name: "Welcome" })).toBeInTheDocument();
    expect(
      screen.queryByLabelText("main", { name: "Store" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("main", { name: "Cart" }),
    ).not.toBeInTheDocument();
  });

  //   it("renders Store when user clicks Store link", async () => {
  //     const user = userEvent.setup();
  //     useOutletContext.mockReturnValue(mockData);
  //
  //     render(
  //       <MemoryRouter initialEntries={["/"]}>
  //         <Routes>
  //           <Route index element={<Navbar />} />{" "}
  //           <Route path="/Store" element={<Store />} />
  //         </Routes>
  //       </MemoryRouter>,
  //     );
  //
  //     const link = screen.getByRole("link", { name: "Store" });
  //     expect(link).toHaveAttribute("href", "/Store");
  //
  //     await user.click(link);
  //
  //     expect(screen.getByRole("main", { name: "Store" })).toBeInTheDocument();
  //     expect(
  //       screen.queryByLabelText("main", { name: "Cart" }),
  //     ).not.toBeInTheDocument();
  //     expect(
  //       screen.queryByLabelText("main", { name: "Welcome" }),
  //     ).not.toBeInTheDocument();
  //   });
  //   it("renders Cart when user clicks Cart link", async () => {
  //     const user = userEvent.setup();
  //
  //     render(
  //       <MemoryRouter initialEntries={["/"]}>
  //         <Routes>
  //           <Route index element={<Navbar />} />{" "}
  //           <Route path="/Cart" element={<Cart />} />
  //         </Routes>
  //       </MemoryRouter>,
  //     );
  //
  //     const link = screen.getByRole("link", { name: "Cart" });
  //     expect(link).toHaveAttribute("href", "/Cart");
  //
  //     await user.click(link);
  //
  //     expect(screen.getByRole("main", { name: "Cart" })).toBeInTheDocument();
  //     expect(
  //       screen.queryByLabelText("main", { name: "Store" }),
  //     ).not.toBeInTheDocument();
  //     expect(
  //       screen.queryByLabelText("main", { name: "Welcome" }),
  //     ).not.toBeInTheDocument();
  //   });
});
