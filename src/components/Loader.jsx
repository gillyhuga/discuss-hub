import {Spinner, Box} from '@chakra-ui/react';

function Loader() {
  return (
    <Box
      position='fixed'
      top='0'
      left='0'
      right='0'
      bottom='0'
      display='flex'
      alignItems='center'
      justifyContent='center'
      zIndex='-1'
    >
      <Spinner size='xl' color='teal.500' />
    </Box>
  );
}

export default Loader;
