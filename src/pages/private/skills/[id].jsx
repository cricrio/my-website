import {
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import InstagramPost from '~/components/Instagram';
import { Page } from '~/components/Page';
import StatusTag from '~/components/StatusTag';

export default function SkillPage({ skill, error }) {
  const mutate = ({ id, status }) =>
    supabase
      .from('skills')
      .update({ status: (status + 1) % 3 })
      .eq('id', id);

  const _skill = { ...skill, ...(data?.data ? data?.data[0] : {}) };

  if (error) {
    return JSON.stringify(error);
  }

  return (
    <Page>
      <VStack spacing={4} mb={8}>
        <Heading size='xl'>{_skill.title}</Heading>
        <HStack spacing={4}>
          <Text fontSize='2xl'>{_skill?.skill_categories?.name}</Text>
          <StatusTag
            status={_skill.status}
            onClick={isLoading ? null : () => mutate(_skill)}
          />
        </HStack>
      </VStack>
      {_skill.description && <Text mb={8}>{_skill.description}</Text>}
      {_skill?.skill_videos?.length && (
        <>
          <Heading size='md' mb={2}>
            Sources
          </Heading>
          <Grid templateColumns='repeat(2, 1fr)' gap={6}>
            {_skill?.skill_videos?.map(({ id, video_src }) => (
              <GridItem key={id}>
                <InstagramPost url={video_src} />
              </GridItem>
            ))}
          </Grid>
        </>
      )}
    </Page>
  );
}

export async function getStaticProps({ params: { id } }, supabase) {
  const { data: skill, error } = await supabase
    .from('skills')
    .select(
      'id, title, description,status, skill_categories (name), skill_videos (id, video_src)}'
    )
    .eq('id', id)
    .maybeSingle();

  if (error) return { props: { error } };

  return {
    props: {
      skill,
    },
  };
}

export async function getStaticPaths() {
  const { data: skills } = await supabase.from('skills').select('id');

  return {
    paths: skills.map(({ id }) => ({ params: { id: `${id}` } })),
    fallback: true,
  };
}
