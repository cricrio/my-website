import { Box, Image, Text } from '@chakra-ui/react';

const InstagramCard = ({ description, image }) => (
  <Box
    overflow='hidden'
    border='white 1px solid'
    borderRadius='lg'
    maxWidth='300px'
  >
    <Image src={image} width='100%' />
    <Text padding={4}>{description}</Text>
  </Box>
);

export default InstagramCard;
