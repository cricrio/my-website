import styled from "styled-components";

const Nav = styled.nav`
  height: 100%;
  flex: 0.1;
  align-self: stretch;
  padding: 1rem;
`;

const Logo = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem;
`;

export const MenuItem = styled.div`
  margin: 1rem;
  font-size: 1.4rem;
`;

export const Menu = ({ children }) => (
  <Nav>
    <Logo>Christopher Bellanger</Logo>
    <div>{children}</div>
  </Nav>
);
