import {useState} from 'react';
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import {Link as ReactRouterLink} from 'react-router-dom';
import {RiChatSmile3Fill} from 'react-icons/ri';
import PropTypes from 'prop-types';

function LoginForm({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    onLogin(formData);
  };

  return (
    <Box rounded="lg" bg="white" boxShadow="lg" minW="xs" px={4} py={8}>
      <Stack spacing={4} align="center">
        <Stack align="center">
          <Icon as={RiChatSmile3Fill} w={75} h={75} />
          <Text fontSize="2xl">DiscusHub</Text>
        </Stack>
        <form style={{width: '100%'}} onSubmit={handleSubmit}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <Button mt={6} colorScheme="teal" width="full" type="submit">
            Sign in
          </Button>
        </form>
        <Text>
          Don`t have an account?{' '}
          <ChakraLink as={ReactRouterLink} to="/register" color="teal.500">
            Register here
          </ChakraLink>
        </Text>
      </Stack>
    </Box>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
