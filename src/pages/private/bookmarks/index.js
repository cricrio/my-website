import { Grid, GridItem, Heading } from '@chakra-ui/react';
import InstagramCard from '~/components/InstagramCard';
import { Page } from '~/components/Page';

export default function Bookmarks({ bookmarks }) {
  return (
    <Page>
      <Heading mb='4' size='xxl'>
        Bookmarks
      </Heading>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {bookmarks.map((bookmark) => (
          <GridItem>
            <InstagramCard {...bookmark} />
          </GridItem>
        ))}
      </Grid>
    </Page>
  );
}

export async function getServerSideProps(_, supabase) {
  const { data: bookmarks, error } = await supabase
    .from('bookmarks')
    .select('id, title, description, image');
  if (error) {
    return { props: { error } };
  }
  return { props: { bookmarks } };
}
