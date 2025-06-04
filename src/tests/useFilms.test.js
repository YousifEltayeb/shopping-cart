import { describe, it, expect } from "vitest";
import useFilms from "../hooks/useFilms.js";
describe("useFilms hook", () => {
  it("Welcome message is rendered", () => {
    expect().toMatchSnapshot();
  });
});
