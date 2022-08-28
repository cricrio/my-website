import {
  Input,
  Flex,
  Button,
  Box,
  Divider,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';

const ListInput = ({ value = [], onChange }) => {
  const inputRef = useRef();
  return (
    <Box width='100%'>
      <Flex justifyContent='space-around' gap={2}>
        <Input ref={inputRef} />
        <Button
          onClick={() => {
            console.log(value) ||
              onChange({
                target: {
                  value: [...(value || []), inputRef.current.value],
                },
              });
            inputRef.current.value = '';
          }}
        >
          Add
        </Button>
      </Flex>

      {value?.length > 0 &&
        value.map((v) => (
          <Flex
            justifyContent='space-between'
            gap={2}
            alignItems='center'
            key={v}
          >
            <Editable defaultValue={v} margin={2}>
              <EditablePreview />
              <EditableInput />
            </Editable>
            <DeleteIcon
              onClick={() =>
                onChange({
                  target: { value: value.filter((fValue) => v !== fValue) },
                })
              }
            />
          </Flex>
        ))}
    </Box>
  );
};

export default ListInput;
