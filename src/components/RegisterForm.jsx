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

function RegisterForm({onRegister}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
    };
    onRegister(formData);
  };

  return (
    <Box rounded="lg" bg="white" boxShadow="lg" minW="xs" px={4} py={8}>
      <Stack spacing={4} align="center">
        <Stack align="center">
          <Icon as={RiChatSmile3Fill} w={75} h={75} />
          <Text fontSize="2xl">DiscusHub</Text>
        </Stack>
        <form style={{width: '100%'}} onSubmit={handleSubmit}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              required
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>
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
          <Button
            mt={6}
            colorScheme="teal"
            width="full"
            type="submit"
          >
                        Register
          </Button>
        </form>
        <Text>
                    Already have an account?{' '}
          <ChakraLink
            as={ReactRouterLink}
            to="/login"
            color="teal.500"
          >
                        Login here
          </ChakraLink>
        </Text>
      </Stack>
    </Box>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterForm;
