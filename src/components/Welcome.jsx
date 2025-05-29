import styled from "styled-components";
import { Link } from "react-router";
const Welcome = () => {
  const Span = styled.span`
    color: red;
  `;
  const Links = styled.div`
    display: flex;
    gap: 1rem;
    font-size: 64px;
    justify-content: center;
  `;
  return (
    <main aria-label="Welcome">
      <h1>
        Welcome To <Span>PickFlick</Span>{" "}
      </h1>{" "}
      <p>We specilize in selling the best animation flicks</p>
      <Links>
        <Link to="/Store">Store</Link>
        <Link to="/Cart">Cart</Link>
      </Links>
    </main>
  );
};

export default Welcome;
