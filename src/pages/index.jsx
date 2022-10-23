// import fs from 'fs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import matter from 'gray-matter';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import path from 'path';
import styled from 'styled-components';
import Intro from '../components/Intro';
import { Page } from '../components/Page';
import { Layout } from '../components/PostLayout';
// import { postFilePaths, POSTS_PATH } from '../utils/mdx';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Text = styled.p``;

export default function Home({ posts }) {
  // const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const data = useUser();
  console.log(data);
  return (
    <button
      onClick={async () => {
        const aa = await supabase.auth.signOut();
      }}
    >
      LOG OUT !!
    </button>
  );
  // <Page>
  //   <Text>{t('introduction')}</Text>
  //   <ul>
  //     {posts.map((post) => (
  //       <li key={post.filePath}>
  //         <Link
  //           as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
  //           href={`/posts/[slug]`}
  //         >
  //           <a>{post.data.title}</a>
  //         </Link>
  //       </li>
  //     ))}
  //   </ul>
  // </Page>
}

const parseCreatedAt = ({ createdAt, ...data }) => ({
  ...data,
  createdAtTimestamp: createdAt?.getTime() ?? null,
});

export async function getStaticProps({ locale }) {
  // const posts = postFilePaths.map((filePath) => {
  //   const source = fs.readFileSync(path.join(POSTS_PATH, filePath));

  //   const { content, data } = matter(source);
  //   return {
  //     content,
  //     data: parseCreatedAt(data),
  //     filePath,
  //   };
  // });

  // const localesProps = await serverSideTranslations(locale, ['common']);

  return { props: { posts: [] } };
}
