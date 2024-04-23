import {Stack} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Thread from './ThreadCard';

function ThreadList({data, upVote, downVote}) {
  return (
    <Stack spacing='4'>
      {data.map((thread, index) => (
        <Thread
          key={index}
          thread={thread}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </Stack>
  );
}

ThreadList.propTypes = {
  data: PropTypes.array.isRequired,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
};

export default ThreadList;
