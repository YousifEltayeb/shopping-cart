import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Footer from "../components/Footer";
import { MemoryRouter } from "react-router";
describe("Footer", () => {
  it("Footer is rendered", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
