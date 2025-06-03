import styled from "styled-components";
import { useOutletContext, Link } from "react-router";
const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Items = styled.section`
  display: grid;
  grid-template-rows: repeat(auto-fill, 12rem);
  padding: 18px;
  margin-left: 50px;
  gap: 18px;
`;
const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 12rem;
  align-items: center;
`;
const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;
const Checkout = styled.button`
  background-color: red;
  width: 18rem;
`;
const OrderDetails = styled.div`
  display: flex;
  gap: 18px;
`;
const Order = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px;
`;
const EmptyCart = styled.main``;
const Cart = () => {
  const [products] = useOutletContext();
  const inCartProducts = products.filter((product) => product.inCart === true);
  const inCartQuantity = inCartProducts.reduce(
    (currentTotal, { quantity }) => currentTotal + quantity,
    0,
  );
  const orderTotal = inCartQuantity * 20;
  if (inCartProducts.length === 0) {
    return (
      <EmptyCart data-testid="empty-cart" aria-label="Cart">
        <h1>Cart is empty</h1>
        <h2>
          <Link to="/store"> return to store to addd products</Link>
        </h2>
      </EmptyCart>
    );
  }
  return (
    <Main data-testid="non-empty-cart" aria-label="Cart">
      <Items>
        {inCartProducts.map((product) => {
          return (
            <Item key={product.id}>
              <Poster src={product.posterPath} alt="film poster" width="auto" />
              <h4>{product.title}</h4>
              <div>{product.quantity}x</div>
              <div>
                <b>{product.price}$</b>
              </div>
            </Item>
          );
        })}
      </Items>
      <Order>
        <h2>Order Summery</h2>
        <OrderDetails>
          <h3>Total ({inCartQuantity} items)</h3>
          <h3 data-testid="total">{orderTotal}$</h3>
        </OrderDetails>
        <Checkout>Checkout</Checkout>
      </Order>
    </Main>
  );
};

export default Cart;
