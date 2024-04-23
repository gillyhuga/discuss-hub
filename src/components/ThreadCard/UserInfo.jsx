import {
  Avatar, Box, Heading, Flex, Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import moment from 'moment';

function ThreadUserInfo({name, avatar, createdAt}) {
  const dateArray = moment(createdAt).toArray();
  return (

    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
      <Avatar name={name} src={avatar} />
      <Box>
        <Heading size='sm'>{name}</Heading>
        <Text>{moment(dateArray).fromNow()}</Text>
      </Box>
    </Flex>
  );
}

ThreadUserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ThreadUserInfo;
