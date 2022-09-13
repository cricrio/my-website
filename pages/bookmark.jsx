import { useRouter } from 'next/router';

export default function Bookmark() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>Title: {router?.query?.title}</h1>
      <h2>Text: {router?.query?.text}</h2>
      <h3>Url: {router?.query?.url}</h3>
    </div>
  );
}
