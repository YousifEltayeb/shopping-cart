import { vi, describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useFilms from "../hooks/useFilms.js";
import { useOutletContext } from "react-router";
vi.mock("react-router");
const products = [null];
const setProducts = vi.fn();
useOutletContext.mockReturnValue([products, setProducts]);
describe("useFilms hook", () => {
  it("useFilms returns expected product object", () => {
    const { result } = renderHook(() => {
      useFilms();
    });
    console.log(result);
  });
});
