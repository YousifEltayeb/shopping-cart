import styled from "styled-components";
const FooterStyle = styled.footer`
  margin-top: auto;
  background-color: #171616;
`;
const Footer = () => {
  return (
    <FooterStyle>
      Created By{" "}
      <a href="https://github.com/YousifTheKind" target="_blank">
        Yousif Eltayeb
      </a>
    </FooterStyle>
  );
};

export default Footer;
