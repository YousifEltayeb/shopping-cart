import { Link } from "react-router";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ShoppingCart } from "lucide-react";
const Nav = styled.nav`
  padding: 12px;
  display: flex;
  justify-content: space-around;
  background-color: #171616;
`;

const Span = styled.span`
  color: red;
  margin-left: 8px;
`;

const StyleCheckout = styled.div`
  display: flex;
  place-items: center;
`;

const StyleLinks = styled.div`
  display: flex;
  gap: 12px;
  place-items: center;
  align-items: center;
`;
const Img = styled.img`
  width: 150px;
`;
const Navbar = ({ products = [] }) => {
  const numberOfProductsInCart =
    products.filter((product) => product.inCart).length || 0;
  return (
    <Nav data-testid="navbar">
      <Link to="/">
        <Img src="../public/logo.png" alt="Logo" />
      </Link>
      <StyleLinks>
        <Link to="/">Home</Link>
        <Link to="/Store">Store</Link>
        <StyleCheckout>
          <Link to="/Cart" aria-label="Cart">
            Cart
          </Link>
          <Span>
            {" "}
            <ShoppingCart width="24px" />
            <span data-testid="nav-num-of-products">
              {numberOfProductsInCart}{" "}
            </span>
          </Span>
        </StyleCheckout>
      </StyleLinks>
    </Nav>
  );
};
Navbar.propTypes = {
  products: PropTypes.array,
};

export default Navbar;
