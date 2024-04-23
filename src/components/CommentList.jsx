import {Stack, Text} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';

function CommentList({
  data, auth, upVote, downVote,
}) {
  if (!data || data.length === 0) {
    return (
      <Text py={6} align='center' fontSize='xl'>
        No comments yet.
      </Text>
    );
  }

  return (
    <>
      <Text py={6} fontSize='xl'>
        {data.length}
        {' '}
        Comments
      </Text>
      <Stack spacing='4'>
        {data.map((comment, index) => (
          <CommentCard
            key={index}
            data={comment}
            auth={auth}
            upVote={upVote}
            downVote={downVote}
          />
        ))}
      </Stack>
    </>

  );
}

CommentList.propTypes = {
  data: PropTypes.array,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  auth: PropTypes.object,
};

export default CommentList;
