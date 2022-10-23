import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ListInput from '~/components/ListInput';

import { Page } from '~/components/Page';
import useForm from '~/src/utils/useForm';

export default function AddSkill({ categories }) {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [skill, skillChangeHandler] = useForm();
  const [skillVideos, onSkillVideoChange] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { data } = await supabase.from('skills').insert([skill]);
    if (data?.length && skillVideos.length) {
      await supabase.from('skill_videos').insert(
        skillVideos.map((src) => ({
          video_src: src,
          source: 'INSTAGRAM',
          skill_id: data[0].id,
        }))
      );
    }
    router.push('/private/skills');
  };

  return (
    <Page>
      <Heading mb='2' size='xl'>
        Create a new skill
      </Heading>
      <VStack onSubmit={onSubmit} as='form'>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            onChange={skillChangeHandler('title')}
            value={skill.title}
            required
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select onChange={skillChangeHandler('category_id')}>
            {categories.map((c) => (
              <option
                value={c.id}
                selected={c.id === skill.categorie}
                key={c.id}
              >
                {c.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={skill.description}
            onChange={skillChangeHandler('description')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Sources</FormLabel>
          <ListInput
            value={skillVideos}
            onChange={({ target: { value } }) => onSkillVideoChange(value)}
          />
        </FormControl>
        <Button type='submit'>Submit</Button>
      </VStack>
    </Page>
  );
}

export async function getStaticProps() {
  const { data: categories } = await supabase
    .from('skill_categories')
    .select('id, name');

  return { props: { categories } };
}
