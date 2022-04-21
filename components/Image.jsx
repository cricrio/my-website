import NextImage from 'next/image';
import styled from 'styled-components';

const myLoader = ({ src, quality }) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public/${src}`;
};

const ImageContainerRoot = styled.div`
  position: relative;
  aspect-ratio: 1;
  background-color: grey;
`;

export const Slot = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 1.5rem;
  width: 1.5rem;
  z-index: 5;
`;

export const ImageContainer = ({ children, slot }) => {
  return (
    <ImageContainerRoot>
      {children} {slot && <Slot>{slot}</Slot>}
    </ImageContainerRoot>
  );
};

export const Image = ({ src, onClick = null, priority = false }) => (
  <NextImage
    src={src}
    loader={myLoader}
    layout='fill'
    objectFit='cover'
    onClick={onClick}
    priority={priority}
  />
);
