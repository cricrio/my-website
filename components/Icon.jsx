import styled from 'styled-components';

const Root = styled.div`
  width: ${({ size }) => size || '1rem'};
  height: ${({ size }) => size || '1rem'};
  color: ${({ color }) => color};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'unset')};
`;

export const Icon = ({ icon: Icon = () => {}, color, size, onClick }) => (
  <Root color={color} onClick={onClick} size={size}>
    <Icon />
  </Root>
);
