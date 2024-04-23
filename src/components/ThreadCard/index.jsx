import {Card, CardBody, Stack, Text} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import ThreadHeader from './Header';
import ThreadUserInfo from './UserInfo';
import ThreadFooter from './Footer';

function Thread({thread, upVote, downVote}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/threads/${thread.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      cursor="pointer"
      _hover={{
        transform: 'scale(1.02)',
        transition: 'transform 0.2s ease',
      }}
    >
      <CardBody>
        <ThreadUserInfo
          name={thread.user.name}
          avatar={thread.user.avatar}
          createdAt={thread.createdAt}
        />
        <ThreadHeader title={thread.title} category={thread.category} />
        <Stack mt="2" spacing="2">
          <Text
            noOfLines={3}
            dangerouslySetInnerHTML={{__html: thread.body}}
          />
        </Stack>
      </CardBody>
      <ThreadFooter
        id={thread.id}
        totalComments={thread.totalComments}
        upVotesBy={thread.upVotesBy}
        downVotesBy={thread.downVotesBy}
        upVote={upVote}
        downVote={downVote}
        auth={thread.authUser}
      />
    </Card>
  );
}

Thread.propTypes = {
  thread: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
    authUser: PropTypes.string,
  }).isRequired,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
};

export default Thread;
