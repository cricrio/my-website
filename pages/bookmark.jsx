import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import InstagramPost from '~/components/Instagram';
import { Page } from '~/components/Page';
import { supabase } from '~/utils/supabaseClient';
import { parse } from 'node-html-parser';
import InstagramCard from '~/components/InstagramCard';
import useForm from '~/utils/useForm';
import Select from '~/components/Select';

export default function Bookmark({ metas }) {
  const router = useRouter();
  const [skill, skillChangeHandler] = useForm(metas);

  const onSubmit = async (event) => {
    event.preventDefault();

    const res = await supabase.from('bookmarks').insert([
      {
        title: skill.title,
        description: skill.description,
        source: skill.source,
        tags: skill.tags,
        image: skill.image,
      },
    ]);
    console.log(res);
  };

  return (
    <Page>
      <Heading mb='2' size='xl'>
        Import from instagram
      </Heading>
      <VStack onSubmit={onSubmit} as='form'>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            onChange={skillChangeHandler('title')}
            value={skill.title}
            required
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Source</FormLabel>
          <Select
            onChange={skillChangeHandler('source')}
            value={skill.source}
            options={[{ label: 'Instagram', value: 'INSTAGRAM' }]}
            required
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            onChange={skillChangeHandler('description')}
            value={skill.description}
            required
          />
        </FormControl>

        <Button type='submit'>Submit</Button>
      </VStack>

      <InstagramCard {...skill} />
    </Page>
  );
}

const selectors = [
  ['description', 'meta[name=description]'],
  ['image', 'meta[property=og:image]'],
];

const tagRegex = /(?<!\w)#[A-Z]\S{1,49}(?!\w)/gi;
const descriptionRegex = /"(.*?)"/m;

export async function getServerSideProps({ query }) {
  const data = await fetch(query?.text)
    .then((res) => res.text())
    .catch(console.error);

  const dom = parse(data);

  const metas = selectors.reduce(
    (acc, [property, selectors]) => ({
      ...acc,
      [property]: dom.querySelector(selectors).attributes.content,
    }),
    {}
  );
  console.log(metas);
  return {
    props: {
      metas: {
        ...metas,
        tags: metas.description.replace('".', ' ').match(tagRegex),
      },
    },
  };
}
