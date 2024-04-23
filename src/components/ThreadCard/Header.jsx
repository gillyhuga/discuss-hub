import {Heading, Stack} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ThreadHeader({title, category}) {
  return (
    <Stack spacing='2' pt={2}>
      <Heading as='h4' size='md'>
        {title}
      </Heading>
      <Heading as='h5' size='sm' color='gray.600'>
        #
        {category}
      </Heading>
    </Stack>
  );
}

ThreadHeader.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ThreadHeader;
