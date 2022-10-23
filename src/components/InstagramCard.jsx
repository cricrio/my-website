import { Box, Image, Text } from '@chakra-ui/react';

const InstagramCard = ({ description, image }) => (
  <Box
    overflow='hidden'
    border='white 1px solid'
    borderRadius='lg'
    maxWidth='300px'
  >
    <Image src={image} width='100%' />
    <Box padding={4}>
      <Text noOfLines={3}>{description}</Text>
    </Box>
  </Box>
);

export default InstagramCard;
