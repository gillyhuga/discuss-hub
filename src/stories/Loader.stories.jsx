import Loader from '@/components/Loader';
import {ChakraProvider} from '@chakra-ui/react';

const stories = {
  title: 'Loader',
  component: Loader,
};

export default stories;

const Default = () => (
  <ChakraProvider>
    <Loader />
  </ChakraProvider>
);

export {Default};
