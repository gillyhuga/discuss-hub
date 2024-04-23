import PropTypes from 'prop-types';
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownLine,
  RiThumbDownFill,
} from 'react-icons/ri';
import {
  Card,
  CardBody,
  Stack,
  Text,
  Flex,
  Avatar,
  Box,
  Heading,
  ButtonGroup,
  Button,
  HStack,
  CardFooter,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import moment from 'moment';

function CommentCard({data, upVote, downVote, auth}) {
  const userId = auth?.id || '';
  const dateArray = moment(data.createdAt).toArray();
  const isUpVoted = data.upVotesBy.includes(userId);
  const isDownVoted = data.downVotesBy.includes(userId);

  const handleVote = (voteType, e) => {
    e.stopPropagation();
    if (!auth) {
      toast.error('Please Login First');
      return;
    }
    if (voteType === 'up') {
      upVote(data.id);
    } else {
      downVote(data?.id);
    }
  };

  return (
    <Card>
      <CardBody>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={data?.owner?.name} src={data?.owner?.avatar} />
            <Box>
              <Heading size="sm">{data?.owner?.name}</Heading>
              <Text>{moment(dateArray).fromNow()}</Text>
            </Box>
          </Flex>
        </Flex>
        <Stack my="2" pt="2" spacing="2">
          <Text dangerouslySetInnerHTML={{__html: data.content}} />
        </Stack>
      </CardBody>
      <CardFooter>
        <HStack spacing="1">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              leftIcon={isUpVoted ? <RiThumbUpFill /> : <RiThumbUpLine />}
              onClick={(e) => handleVote('up', e)}
            >
              {data?.upVotesBy?.length}
            </Button>
            <Button
              leftIcon={isDownVoted ? <RiThumbDownFill /> : <RiThumbDownLine />}
              onClick={(e) => handleVote('down', e)}
            >
              {data?.downVotesBy?.length}
            </Button>
          </ButtonGroup>
        </HStack>
      </CardFooter>
    </Card>
  );
}

CommentCard.propTypes = {
  data: PropTypes.shape({
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

export default CommentCard;
