import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
const Main = styled.main`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  align-items: baseline;
`;
const Items = styled.section`
  display: flex;
`;
const Item = styled.div``;
const Order = styled.section``;
const Cart = () => {
  const [products] = useOutletContext();
  const inCartProducts = products.filter((product) => product.inCart === true);
  console.log(inCartProducts);
  if (inCartProducts.length === 0) {
    return (
      <>
        <h1>Cart is empty</h1>
        <h2>
          <Link to="/store"> return to store to addd products</Link>
        </h2>
      </>
    );
  }
  return (
    <Main aria-label="Cart">
      <Items>
        {inCartProducts.map((product) => {
          return (
            <Item key={product.id}>
              {/* <img src={product.path} alt="" /> */}
              <div>{product.title}</div>
              <div>{product.quantity}</div>
              <div>{product.price}</div>
            </Item>
          );
        })}
      </Items>
      <Order>
        <h2>Order Summery</h2>
      </Order>
    </Main>
  );
};

export default Cart;
