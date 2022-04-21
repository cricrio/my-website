import { useState } from 'react';
import styled from 'styled-components';
import Xmark from '../icons/xmark.svg';
import { Icon } from './Icon';
import { Image, ImageContainer } from './Image';

const Root = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  opacity: 1;
`;

const StyledImageContainer = styled(ImageContainer)`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: min(80vh, 100vw);
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem;
`;

const Side = styled.div`
  position: absolute;
  height: 85%;
  padding: 10%;
  top: 50%;
  transform: translateY(-50%);
`;

const LeftSide = styled(Side)`
  left: 0;
  cursor: w-resize;
`;

const RightSide = styled(Side)`
  right: 0;
  cursor: e-resize;
`;

export const ImagePopup = ({ index, images, close }) => {
  console.log({ index, images, close });
  const [currentIndex, setCurrentIndex] = useState(index);
  const currentImage = images[currentIndex];

  const toRight = () =>
    setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  const toLeft = () =>
    setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));

  return (
    <Root>
      <Header>
        <Icon icon={Xmark} color='white' onClick={close} />
      </Header>
      <LeftSide onClick={toLeft} />
      <StyledImageContainer>
        <Image src={currentImage.uri} />
      </StyledImageContainer>
      <RightSide onClick={toRight} />
    </Root>
  );
};
