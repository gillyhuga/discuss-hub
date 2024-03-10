import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Icon,
  Link as ChakraLink
} from '@chakra-ui/react'
import { RiChatSmile3Fill } from 'react-icons/ri'
import { Link as ReactRouterLink } from 'react-router-dom'

function RegisterPage (): JSX.Element {
  return (
    <>
    <Flex
      minH="100vh"
      align="center"
      justify="center"
    >
      <Box
        rounded="lg"
        bg="white"
        boxShadow="lg"
        minW="xs"
        px={4}
        py={8}
      >
        <Stack
          spacing={4}
          align="center"
        >
          <Stack align="center">
            <Icon as={RiChatSmile3Fill} w={75} h={75} />
            <Text fontSize="2xl">DiscusHub</Text>
          </Stack>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button
            colorScheme="teal"
            width="full"
          >
            Register
          </Button>
          <Text>
            Already have an account?
            {' '}
            <ChakraLink to="/login" as={ReactRouterLink} color="teal.500">
              Login here
            </ChakraLink>
          </Text>
        </Stack>
      </Box>
    </Flex>
    </>
  )
}

export default RegisterPage
