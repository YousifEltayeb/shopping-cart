import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_TMBD_KEY;
interface Product {
  id: number;
  title: string;
  posterPath: string;
  inCart: false;
  price: number;
  quantity: number;
}
const useFilms = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      // if we already called the api and data is in products no need to call again
      if (fetchedProducts.length > 0) {
        setLoading(false);
        return;
      }
      const url =
        "https://api.themoviedb.org/3/discover/movie?with_genres=10751,16&sort_by=vote_average.desc&language=en-US&page=1&vote_count.gte=200";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };
      // fetch films
      fetch(url, options)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((json) => {
          const newProductsArray: Product[] = [];
          const fetchedFilms = json.results;
          fetchedFilms.forEach(
            (film: { id: number; title: string; poster_path: string }) => {
              const imgURL =
                "https://image.tmdb.org/t/p/w780" + film.poster_path || "";
              const newProduct: Product = {
                id: film.id,
                title: film.title,
                posterPath: imgURL,
                inCart: false,
                price: 20,
                quantity: 0,
              };
              newProductsArray.push(newProduct);
            },
          );
          setFetchedProducts(newProductsArray);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    })();
  }, [fetchedProducts.length, setFetchedProducts]);
  return { fetchedProducts, error, loading };
};

export default useFilms;
