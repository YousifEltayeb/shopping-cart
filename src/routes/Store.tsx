import styled from "styled-components";
import useFilms from "../hooks/useFilms";
import { useProducts } from "../App";
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
  const { products, setProducts } = useProducts();
  const { fetchedProducts, error, loading } = useFilms();
  if (fetchedProducts) setProducts(fetchedProducts);
  const handleQuantityInc = (newQuantity: number, productId: number) => {
    handleQuantityChange(newQuantity, productId);
  };
  const handleQuantityDec = (newQuantity: number, productId: number): void => {
    handleQuantityChange(newQuantity, productId);
  };
  const handleQuantityChange = (
    newQuantity: number,
    productId: number,
  ): void => {
    const updatedProducts = [...products];
    const filmIndex = updatedProducts.findIndex(
      (product) => product.id === productId,
    );

    updatedProducts[filmIndex].quantity = newQuantity < 0 ? 0 : newQuantity;

    setProducts(() => updatedProducts);
  };
  const updateProducts = (productId: number) => {
    const updatedProducts = [...products];
    const filmIndex = updatedProducts.findIndex(
      (product) => product.id === productId,
    );
    if (updatedProducts[filmIndex].quantity > 0)
      updatedProducts[filmIndex].inCart = true;
    setProducts(() => updatedProducts);
  };
  if (loading)
    return (
      <Main data-testid="loading" aria-label="Store">
        Loading...
      </Main>
    );
  if (error)
    return (
      <Main data-testid="api-error" aria-label="Store">
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
            <h4 data-testid="product-title">{product.title}</h4>
            <Quantity>
              <button
                id="decrement"
                data-testid="decrement-button"
                onClick={() =>
                  handleQuantityDec(product.quantity - 1, product.id)
                }
              >
                -
              </button>
              <QuantityInput
                data-testid="quantity-input"
                type="number"
                min="1"
                value={product.quantity}
                onChange={() =>
                  handleQuantityChange(product.quantity, product.id)
                }
                required
              />
              <button
                id="increment"
                data-testid="increment-button"
                onClick={() =>
                  handleQuantityInc(product.quantity + 1, product.id)
                }
              >
                +
              </button>
            </Quantity>
            <AddToCartButton
              data-testid="add-to-cart-button"
              onClick={() => updateProducts(product.id)}
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
