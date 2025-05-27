import styled from "styled-components";
import useFilms from "../hooks/useFilms.jsx";
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
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  width: 100%;
`;
const AddToCartButton = styled.button`
  background-color: #ff0101;
  color: black;
  margin-top: auto;
`;
const Store = () => {
  const { products, setProducts, error, loading } = useFilms();
  const changeQuantity = (clickedButton) => {
    const inputFieldElm = clickedButton.parentNode.querySelector("input");
    if (clickedButton.textContent === "+") {
      inputFieldElm.value = ++inputFieldElm.value;
    } else if (clickedButton.textContent === "-" && inputFieldElm.value > 0) {
      inputFieldElm.value = --inputFieldElm.value;
    }
  };
  const addToCart = (targetElm, filmID) => {
    const inputFieldElmValue =
      targetElm.parentNode.querySelector("input").value;
    const filmIndex = products.findIndex((product) => product.id === filmID);
    if (inputFieldElmValue <= 0) {
      alert("Quantity cannot be 0");
      return;
    }
    const newProducts = [...products];
    newProducts[filmIndex].inCart = true;
    newProducts[filmIndex].quantity = Number(inputFieldElmValue);
    setProducts(newProducts);
  };
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
            <img src={product.posterPath} alt="film poster" />
            <h4>{product.title}</h4>
            <Quantity>
              <button
                id="decrement"
                onClick={(e) => {
                  changeQuantity(e.target);
                }}
              >
                -
              </button>
              <QuantityInput type="number" />
              <button
                id="increment"
                onClick={(e) => {
                  changeQuantity(e.target);
                }}
              >
                +
              </button>
            </Quantity>
            <AddToCartButton
              onClick={(e) => {
                addToCart(e.target, product.id);
              }}
            >
              Add to cart
            </AddToCartButton>
          </Card>
        );
      })}
    </Main>
  );
};

export default Store;
