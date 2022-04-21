import styled from 'styled-components';

export const Gallery = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-content: space-around;
`;
