import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_TMBD_KEY;

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));

  gap: 3rem;
  padding: 1rem;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background-color: #262626;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const Quantity = styled.div`
  display: flex;
`;
const QuantityInput = styled.input`
  width: 100%;
`;
const AddToCartButton = styled.button`
  background-color: #ff0101;
  color: black;
  margin-top: auto;
`;
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
        setImgSize(json.images.poster_sizes[2]);
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
  useEffect(() => {
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
    // if (products.length === 0) {
    fetch(url, options)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((json) => {
        console.log("api call");
        const fetchedFilms = json.results;
        const newProductsArray = [];
        fetchedFilms.forEach((film) => {
          const newProduct = {
            id: film.id,
            title: film.title,
            posterPath: film.poster_path,
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
    // }
  }, [products.length, setProducts]);
  return { products, error, loading };
};
const Store = () => {
  const { products, error, loading } = useFilms();
  const { baseImgURL, imgSize } = usePoster();

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
            <img src={baseImgURL + imgSize + product.posterPath} alt="" />
            <h4>{product.title}</h4>
            <Quantity>
              <button>-</button>
              <QuantityInput type="number" min="0" />
              <button>+</button>
            </Quantity>
            <AddToCartButton>Add to cart</AddToCartButton>
          </Card>
        );
      })}
    </Main>
  );
};
export default Store;
