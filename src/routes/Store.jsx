import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_TMBD_KEY;

const Main = styled.main`
  flex: 1 0 auto;
`;
const Card = styled.div``;
const useFilms = () => {
  const [products, setProducts] = useOutletContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
            const newProduct = {
              id: film.id,
              title: film.title,
              imgURL: film.poster_path,
              inCart: true,
            };
            newProductsArray.push(newProduct);
          });
          setProducts([...newProductsArray]);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, [products.length, setProducts]);
  return { products, error, loading };
};
const Store = () => {
  const { products, error, loading } = useFilms();
  console.log(products, loading);

  // useEffect(() => {
  //   const url = "https://api.themoviedb.org/3/configuration";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization: `Bearer ${API_KEY}`,
  //     },
  //   };
  //
  //   fetch(url, options)
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  //     .catch((err) => console.error(err));
  // }, []);
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
      <div>{products[0].title}</div>
      {products.map((product) => {
        return (
          <Card key={product.id}>
            <span>{product.title}</span>
          </Card>
        );
      })}
    </Main>
  );
};
export default Store;
