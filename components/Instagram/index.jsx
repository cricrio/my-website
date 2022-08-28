import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  padding-top: calc(100% + 98px);
`;

const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: var(--chakra-radii-md);
`;
const InstagramPost = ({ url }) => (
  <Container>
    <Iframe src={`${url}embed`} allowFullScreen height='100%' width='100%' />
  </Container>
);

export default InstagramPost;
