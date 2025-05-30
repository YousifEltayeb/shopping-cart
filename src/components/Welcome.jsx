import styled from "styled-components";
const Welcome = () => {
  const Span = styled.span`
    color: red;
  `;
  return (
    <main aria-label="Welcome">
      <h1>
        Welcome To <Span>PickFlick</Span>{" "}
      </h1>
      <p>We specilize in selling the best animation flicks</p>
    </main>
  );
};

export default Welcome;
