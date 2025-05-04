import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_TMBD_KEY;

const Main = styled.main`
    flex: 1 0 auto;
`;
const Store = () => {
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

                    console.log(fetchedFilms);
                })
                .catch((err) => setError(err))
                .finally(() => setLoading(false));
        }
    }, []);
    console.log(products);

    useEffect(() => {
        const url = "https://api.themoviedb.org/3/configuration";
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
        };

        // fetch(url, options)
        //     .then((res) => res.json())
        //     .then((json) => console.log(json))
        //     .catch((err) => console.error(err));
    }, []);
    if (loading) return <Main aria-label="Store">Loading...</Main>;
    if (error)
        return (
            <Main aria-label="Store">
                A network error was encountered <br />
                {error}
            </Main>
        );
    return <Main aria-label="Store">Hello From Store!</Main>;
};
export default Store;
