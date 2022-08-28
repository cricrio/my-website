import styled from 'styled-components';
import { Center } from './Center';

const Text = styled.div`
  font-size: 8vw;
  font-weight: 800;
`;

const ColoredText = styled.span`
  color: var(--primary-color);
`;

const Intro = () => {
  return (
    <Center>
      <div>
        <Text>
          <ColoredText>Christopher</ColoredText> Bellanger
        </Text>
        <Text>
          Creative <ColoredText>coder</ColoredText>
        </Text>
      </div>
    </Center>
  );
};

export default Intro;
