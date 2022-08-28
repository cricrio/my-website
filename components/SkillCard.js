import { Avatar, Heading, Tag, TagLabel } from '@chakra-ui/react';
import { Box } from './Box';
import Link from './Link';
import StatusTag from './StatusTag';

const SkillCard = ({ title, status, link }) => (
  <Box border='1px' borderColor='gray.200' padding='1'>
    <Heading as='h4' size='md' mb='4'>
      <Link href={link}> {title}</Link>
    </Heading>
    <StatusTag status={status} />
  </Box>
);

export default SkillCard;
