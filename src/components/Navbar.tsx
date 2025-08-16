import { Link } from "react-router";
import styled from "styled-components";
import { ShoppingCart } from "lucide-react";
import logo from "../../public/logo.png";
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
const Navbar = ({ context = [{ inCart: false }] }) => {
  const numberOfProductsInCart =
    context.filter((context) => context.inCart).length || 0;
  return (
    <Nav data-testid="navbar">
      <Link to="/">
        <Img src={logo} alt="Logo" />
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

export default Navbar;
