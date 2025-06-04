import { beforeEach, vi, describe, it, expect } from "vitest";
import { waitFor, renderHook } from "@testing-library/react";
import useFilms from "../hooks/useFilms.js";
describe("useFilms hook default values", () => {
  global.fetch = vi.fn();
  it("Returns expected initial values for products, error, loading", () => {
    const { result } = renderHook(() => useFilms());
    const { fetchedProducts, error, loading } = result.current;
    expect(fetchedProducts.length).toBe(0);
    expect(error).toBe(null);
    expect(loading).toBe(true);
  });
});
describe("Mock fetch response", () => {
  let products;
  beforeEach(() => {
    vi.clearAllMocks(); // Reset all mocked calls between tests
    products = [
      {
        id: 1,
        title: "some title",
        poster_path: "/some/path",
        inCart: false,
        price: 20,
        quantity: 0,
      },
    ];
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ results: products }),
    });
  });
  it("Returns correct product object when fetch is successful", async () => {
    const { result, rerender } = renderHook(() => useFilms());
    rerender();
    await waitFor(() => {
      expect(result.current).toEqual({
        fetchedProducts: [
          {
            id: 1,
            title: "some title",
            posterPath: "https://image.tmdb.org/t/p/w780/some/path",
            inCart: false,
            price: 20,
            quantity: 0,
          },
        ],
        error: null,
        loading: false,
      });
    });
  });
});
