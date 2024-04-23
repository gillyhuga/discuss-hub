import {useState} from 'react';
import {Box, Text, Button, Textarea, Link} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';

function CommentForm({onSubmit, auth}) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <Box py={4}>
      {auth ? (
        <>
          <Text fontSize="xl" mb={2}>
            Leave a Comment
          </Text>
          <Textarea
            placeholder="Write your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            mb={2}
          />
          <Button colorScheme="teal" onClick={handleSubmit} float="right">
            Submit
          </Button>
        </>
      ) : (
        <Box bg="gray.100" p={4} borderRadius="md" textAlign="center">
          <Text fontSize="lg">
            Please
            <Link as={RouterLink} to="/login" color="teal.500">
              log in
            </Link>{' '}
            to leave a comment.
          </Text>
        </Box>
      )}
    </Box>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

export default CommentForm;
