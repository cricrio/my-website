// import fs from 'fs';
// import matter from '../../utils/matter';
// import { MDXRemote } from 'next-mdx-remote';
// import { serialize } from 'next-mdx-remote/serialize';
// import path from 'path';
import { PostLayout } from '../../components/PostLayout';
import { postFilePaths, POSTS_PATH } from '../../utils/mdx';

// https://www.kevinpeters.net/remote-mdx-next-js

const serialize = (_) => _;

export default function PostPage({ source, frontMatter = {} }) {
  return (
    <PostLayout>
      <div className='post-header'>
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className='description'>{frontMatter.description}</p>
        )}
      </div>
      <main>{/* <MDXRemote {...source} /> */}</main>
    </PostLayout>
  );
}

// export const getStaticProps = async ({ params }) => {
//   const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
//   const source = fs.readFileSync(postFilePath);

//   const { content, data } = matter(source);

//   const mdxSource = await serialize(content, {
//     // Optionally pass remark/rehype plugins
//     mdxOptions: {
//       remarkPlugins: [],
//       rehypePlugins: [],
//     },
//     scope: data,
//   });

//   return {
//     props: {
//       source: mdxSource,
//       frontMatter: data,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const paths = postFilePaths
//     // Remove file extensions for page paths
//     .map((path) => path.replace(/\.mdx?$/, ''))
//     // Map the path into the static paths object required by Next.js
//     .map((slug) => ({ params: { slug } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
