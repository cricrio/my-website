import styled from 'styled-components';
import { Header } from './Header';

const Container = styled.div`
  height: calc(100vh - 6rem);
  margin: auto;
  width: min(100%, 40rem);
`;

export const Page = ({ children }) => (
  <div>
    <Header />
    <Container>{children}</Container>
  </div>
);
