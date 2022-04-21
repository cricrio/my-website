import styled from "styled-components";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  align-items: stretch;
`;

export const Page = ({ menu = null, children }) => (
  <Grid>
    {menu}
    <div>{children}</div>
  </Grid>
);
