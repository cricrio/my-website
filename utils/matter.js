import matter from 'gray-matter';

const parseCreatedAt = ({ content, data: { createdAt, ...data } }) => ({
  content,
  data: {
    ...data,
    createdAtTimestamp: createdAt?.getTime() ?? null,
  }
});

const _matter = (arg) => parseCreatedAt(matter(arg))

export default _matter;