import styled from "styled-components";
const FooterStyle = styled.footer`
    margin-top: auto;
    background-color: #171616;
`;
const Footer = () => {
    return (
        <FooterStyle>
            Made With ❤️ By{" "}
            <a href="https://github.com/YousifTheKind" target="_blank">
                Yousif Eltayeb
            </a>
            <p style={{ fontSize: "12px" }}>
                As part of the{" "}
                <a href="https://theodinproject.com/" target="_blank">
                    The Odin Project
                </a>{" "}
            </p>
        </FooterStyle>
    );
};

export default Footer;
