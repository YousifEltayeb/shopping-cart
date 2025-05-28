import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Routes, Route, MemoryRouter, BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";
describe("Navigating", () => {
  const user = userEvent.setup();
  it("full app rendering/navigating", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
  });
  expect(screen.getByRole("main", { name: "Welcome" })).toBeInTheDocument();
});
