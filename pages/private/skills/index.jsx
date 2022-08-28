import { Button, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import SkillCard from '~/components/SkillCard';
import { supabase } from '~/utils/supabaseClient';
import { Header } from '../../../components/Header';
import { Page } from '../../../components/Page';

export default function SkillList({ categories, error }) {
  const router = useRouter();
  if (error) {
    return JSON.stringify(error);
  }

  return (
    <Page>
      <Flex justifyContent='space-between'>
        <Heading mb='2'>Skills</Heading>
        <Button
          onClick={() => router.push('/private/skills/add')}
          variant='solid'
        >
          ✍️ Create
        </Button>
      </Flex>

      {Object.entries(categories).map(([category, skills]) => (
        <>
          <Heading as='h3' size='lg' mb='4'>
            {category}
          </Heading>
          <Grid templateColumns='repeat(2, 1fr)' gap='4' mb='4'>
            {skills.map((s) => (
              <GridItem>
                <SkillCard {...s} link={`/private/skills/${s.id}`} />
              </GridItem>
            ))}
          </Grid>
        </>
      ))}
    </Page>
  );
}

export async function getStaticProps() {
  const { data: skills, error } = await supabase
    .from('skills')
    .select('id, title, status, skill_categories (name)');

  if (error) {
    return { props: { error } };
  }

  // Group the skills by category
  const categories = skills.reduce((acc, item) => {
    const category = item.skill_categories?.name ?? 'Other';
    return { ...acc, [category]: [...(acc[category] || []), item] };
  }, {});

  return { props: { categories } };
}
