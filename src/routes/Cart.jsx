import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

const Main = styled.main`
  flex: 1 0 auto;
`;
const Cart = () => {
  const [products] = useOutletContext();
  const inCartProducts = products.filter((product) => product.inCart === true);
  console.log(inCartProducts);
  return (
    <Main aria-label="Cart">
      {inCartProducts.map((product) => {
        return <div key={product.id}>{product.title}</div>;
      })}
    </Main>
  );
};

export default Cart;
