import { beforeEach, vi, describe, it, expect } from "vitest";
import { waitFor, renderHook } from "@testing-library/react";
import { useProducts, ProductsProvidor } from "../hooks/useFilms";

describe("useFilms hook default values", () => {
  it("Returns expected initial values for products, error, loading", () => {
    const { result } = renderHook(() => useProducts());
    const { products, dispatch, error, loading } = result.current;
    expect(products.length).toBe(0);
    expect(error).toBe(null);
    expect(loading).toBe(true);
    expect(dispatch).toBeDefined();
  });
});
describe("Mock fetch response", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset all mocked calls between tests
    const products = [
      {
        id: 1,
        title: "some title",
        poster_path: "/some/path",
        inCart: false,
        price: 20,
        quantity: 0,
      },
    ];
    // @ts-ignore
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: products }),
      }),
    );
  });
  it("Returns correct product object when fetch is successful", async () => {
    const { result, rerender } = renderHook(() => useProducts(), {
      wrapper: ProductsProvidor,
    });
    rerender();
    await waitFor(() => {
      expect(result.current.products).toEqual([
        {
          id: 1,
          title: "some title",
          posterPath: "https://image.tmdb.org/t/p/w780/some/path",
          inCart: false,
          price: 20,
          quantity: 0,
        },
      ]);
      expect(result.current.error).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.dispatch).toBeInstanceOf(Function);
    });
  });
});
