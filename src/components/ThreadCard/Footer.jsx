import {
  Button, ButtonGroup, CardFooter, HStack,
} from '@chakra-ui/react';
import {
  RiThumbUpLine, RiThumbUpFill, RiThumbDownLine, RiThumbDownFill, RiChat4Line,
} from 'react-icons/ri';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

function ThreadFooter({
  id, auth, totalComments, upVotesBy, downVotesBy, upVote, downVote,
}) {
  const isUpVoted = upVotesBy.includes(auth);
  const isDownVoted = downVotesBy.includes(auth);

  const handleVote = (voteType, e) => {
    e.stopPropagation();
    if (!auth) {
      toast.error('Please Login First');
      return;
    }
    if (voteType === 'up') {
      upVote(id);
    } else {
      downVote(id);
    }
  };

  return (
    <CardFooter>
      <HStack spacing='1'>
        <ButtonGroup size='sm' isAttached variant='outline'>
          <Button
            leftIcon={isUpVoted ? <RiThumbUpFill /> : <RiThumbUpLine />}
            onClick={(e) => handleVote('up', e)}
          >
            {upVotesBy.length}
          </Button>
          <Button
            leftIcon={isDownVoted ? <RiThumbDownFill /> : <RiThumbDownLine />}
            onClick={(e) => handleVote('down', e)}
          >
            {downVotesBy.length}
          </Button>
        </ButtonGroup>
        <Button size='sm' variant='outline' leftIcon={<RiChat4Line />}>
          {totalComments}
        </Button>
      </HStack>
    </CardFooter>
  );
}

ThreadFooter.propTypes = {
  id: PropTypes.string.isRequired,
  auth: PropTypes.string,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadFooter;
