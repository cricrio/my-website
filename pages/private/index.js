import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { Gallery } from "../../components/Gallery";
import { Header } from "../../components/Header";
import { Image, ImageContainer } from "../../components/Image";
import { NotAuthorizedPage } from "../../components/NotAuthorizedPage";
import { useGetAuth } from "../../context/auth";
import { getMedia } from "../../db/data";


const useList = (session) => {
  const listRef = useRef([]);
  const [filter, setFilter] = useState([true, false]);

  useEffect(() => {
    getData()
  }, [session]);

  const getData = async () => {
    if (session) {
      const media = await getMedia(filter)
      listRef.current = media;
      console.log(media)
      setCurrentList(media)
    }
  }

  const [currentList, setCurrentList] = useState([]);



  const onFilterChange = (filter) => () => setFilter(filter);

  const onPrivateChange = (image) => () => {
    setCurrentList(list => list.map(item => item.id === image.id ? { ...item, private: !item.private, updated: true } : item))
  }


  return [
    currentList.filter(i => filter.some(f => i.private === f)),
    {
      onFilterChange,
      onPrivateChange
    }
  ]
}
export default function Private() {
  const session = useGetAuth();
  const [list, { onFilterChange, onPrivateChange }] = useList(session);




  return session ? (
    <>
      <Header position='fixed'>
        <Button onClick={onFilterChange([true, false])}>
          all
        </Button>
        <Button onClick={onFilterChange([false])}>
          visible
        </Button>
        <Button onClick={onFilterChange([true])}>
          hidden
        </Button>
      </Header>
      <Gallery>
        {list.map((image) => (
          <ImageContainer slot={<input type='checkbox' id={image.id} checked={image.private} onChange={onPrivateChange(image)} />}>
            <Image src={image.uri} />
          </ImageContainer>))}
      </Gallery>


    </>
  ) : <NotAuthorizedPage />;
}