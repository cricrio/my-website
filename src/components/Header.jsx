import styled from 'styled-components';

const Container = styled.header`
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Text = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const Header = () => (
  <Container>
    <Text>Christopher Bellanger</Text>
  </Container>
);
