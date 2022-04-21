import styled from 'styled-components';

const Root = styled.div`
  width: 1rem;
  height: 1rem;
  color: ${({ color }) => color};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'unset')};
`;

export const Icon = ({ icon: Icon = () => {}, color, onClick }) => (
  <Root color={color} onClick={onClick}>
    <Icon />
  </Root>
);
