import { Link } from "react-router";
import styled from "styled-components";

const Main = styled.main``;
const ErrorPage = () => {
  return (
    <Main aria-label="ErrorPage">
      <h1>Oh no, this route does not exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </Main>
  );
};

export default ErrorPage;
