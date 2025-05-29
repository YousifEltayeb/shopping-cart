import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Store from "../routes/Store";
import { Routes, Route, MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import * as rrd from "react-router";

describe("Store", () => {
  const [products, setProducts] = [];
  let mockData = [products, setProducts];
  vi.mock("react-router-dom");

  it("Store is rendered", async () => {
    // rrd.useOutletContext.mockReturnValue(mockData);
    const { container } = render(
      <MemoryRouter>
        <Routes>
          <Route element={<Store />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
