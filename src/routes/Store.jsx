import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_TMBD_KEY;

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const Card = styled.div``;
const usePoster = () => {
  const [baseImgURL, setBaseImgURL] = useState("");
  const [imgSize, setImgSize] = useState("");
  useEffect(() => {
    const url = "https://api.themoviedb.org/3/configuration";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setImgSize(json.images.poster_sizes[0]);
        setBaseImgURL(json.images.base_url);
      })
      .catch((err) => console.error(err));
  }, [baseImgURL, imgSize]);
  return { baseImgURL, imgSize };
};
const useFilms = () => {
  const [products, setProducts] = useOutletContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { baseImgURL, imgSize } = usePoster();
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    if (products.length === 0) {
      fetch(url, options)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((json) => {
          const fetchedFilms = json.results;
          const newProductsArray = [];
          fetchedFilms.forEach((film) => {
            console.log(baseImgURL);
            const newProduct = {
              id: film.id,
              title: film.title,
              imgURL: `${baseImgURL}${imgSize}${film.poster_path}`,
              inCart: true,
              price: 20,
              quantity: 0,
            };
            newProductsArray.push(newProduct);
          });
          setProducts([...newProductsArray]);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, [products.length, setProducts, baseImgURL, imgSize]);
  return { products, error, loading };
};
const Store = () => {
  const { products, error, loading } = useFilms();

  if (loading) return <Main aria-label="Store">Loading...</Main>;
  if (error)
    return (
      <Main aria-label="Store">
        A network error was encountered <br />
        {error}
      </Main>
    );
  return (
    <Main aria-label="Store">
      {products.map((product) => {
        return (
          <Card key={product.id}>
            <span>{product.title}</span>
            <img src={product.imgURL} alt="" />
          </Card>
        );
      })}
    </Main>
  );
};
export default Store;
