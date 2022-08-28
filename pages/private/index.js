import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Gallery } from '../../components/Gallery';
import { Header } from '../../components/Header';
import { Image, ImageContainer } from '../../components/Image';
import { NotAuthorizedPage } from '../../components/NotAuthorizedPage';
import { useGetAuth } from '../../context/auth';
import { getMedia, updateMedia } from '../../utils/data';
import Eye from '../../icons/eye.svg';
import EyeSlash from '../../icons/eye-slash.svg';
import { Icon } from '../../components/Icon';

const useList = (session) => {
  const [filter, setFilter] = useState([true, false]);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    getData();
  }, [session]);

  const getData = async () => {
    if (session) {
      const media = await getMedia(filter);
      setCurrentList(media);
    }
  };

  const onFilterChange = (filter) => () => setFilter(filter);

  const onPrivateChange = (image) => () => {
    setCurrentList((list) =>
      list.map((item) =>
        item.id === image.id
          ? { ...item, private: !item.private, changed: true }
          : item
      )
    );
  };

  const onSave = async () => {
    const updatedList = await updateMedia(currentList);
    setCurrentList(updatedList);
  };

  return [
    currentList.filter((i) => filter.some((f) => i.private === f)),
    {
      onFilterChange,
      onPrivateChange,
      onSave,
    },
  ];
};
export default function Private() {
  const session = useGetAuth();
  const [list, { onFilterChange, onPrivateChange, onSave }] = useList(session);

  return session ? (
    <>
      <Header position='fixed'>
        <Button onClick={onFilterChange([true, false])}>all</Button>
        <Button onClick={onFilterChange([false])}>public</Button>
        <Button onClick={onFilterChange([true])}>private</Button>
        <Button onClick={onSave}>save</Button>
      </Header>
      <Gallery>
        {list.map((image) => {
          const icon = image.private ? EyeSlash : Eye;
          return (
            <ImageContainer
              slot={
                <Icon
                  size='1.3rem'
                  color='white'
                  icon={icon}
                  onClick={onPrivateChange(image)}
                />
              }
            >
              <Image src={image.uri} />
            </ImageContainer>
          );
        })}
      </Gallery>
    </>
  ) : (
    <NotAuthorizedPage />
  );
}
