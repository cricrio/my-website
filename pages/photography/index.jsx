import { useState } from 'react';
import { Gallery } from '../../components/Gallery';
import { ImagePopup } from '../../components/ImagePopup';
import { Image, ImageContainer } from '../../components/Image';
import { getMedia } from '../../db/data';

export default function Photography({ media }) {
  const [imageIndex, setImageIndex] = useState(null);

  const open = (index) => () => setImageIndex(index);

  return (
    <>
      {isNaN(imageIndex) && (
        <ImagePopup index={imageIndex} images={media} close={open()} />
      )}
      <div>
        <Gallery>
          {media.map((img, index) => (
            <ImageContainer>
              <Image src={img.uri} onClick={open(index)} />
            </ImageContainer>
          ))}
        </Gallery>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const media = await getMedia();
  return {
    props: {
      media,
    },
  };
}
