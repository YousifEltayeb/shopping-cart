import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
const API_KEY = import.meta.env.VITE_TMBD_KEY;
const useFilms = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [baseImgURL, setBaseImgURL] = useState("");
  const [imgSize, setImgSize] = useState("");
  const [products, setProducts] = useOutletContext();
  useEffect(() => {
    (async () => {
      // if we already called the api and data is in products no need to call again
      if (products.length > 0) {
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
      const configURL = "https://api.themoviedb.org/3/configuration";
      const configOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };
      // fetch img base url and size
      await fetch(configURL, configOptions)
        .then((res) => res.json())
        .then((json) => {
          setBaseImgURL(json.images.base_url);
          setImgSize(json.images.poster_sizes[3]);
        })
        .catch((error) => setError(error));
      // fetch films
      fetch(url, options)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((json) => {
          console.log("api call");
          const newProductsArray = [];
          const fetchedFilms = json.results;
          fetchedFilms.forEach((film) => {
            const imgURL = baseImgURL + imgSize + film.poster_path;
            const newProduct = {
              id: film.id,
              title: film.title,
              posterPath: imgURL,
              inCart: false,
              price: 20,
              quantity: 0,
            };
            newProductsArray.push(newProduct);
          });
          setProducts(newProductsArray);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    })();
  }, [products.length, setProducts, baseImgURL, imgSize]);
  return { products, error, loading, setProducts };
};

export default useFilms;
