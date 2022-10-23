import { Tag, TagLabel } from '@chakra-ui/react';

const statusLabels = {
  0: '🥚 Not Learned',
  1: '🐣 Learning',
  2: '🐥 Learned',
};

const StatusTag = ({ status, onClick }) => (
  <Tag size='lg' colorScheme='white' borderRadius='full' onClick={onClick}>
    <TagLabel>{statusLabels[status]}</TagLabel>
  </Tag>
);

export default StatusTag;
