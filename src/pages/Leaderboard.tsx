import { Avatar, Box, Card, HStack, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

function LeaderboardPage (): JSX.Element {
  const userData = [
    {
      user: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg'
      },
      score: 10
    },
    {
      user: {
        id: 'users-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg'
      },
      score: 5
    }
  ]

  return (
    <div>
      <Heading as='h3' size='lg' py={5}>Leaderboards</Heading>
      <Card>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th isNumeric>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData.map((user, index) => (
                <Tr key={index}>
                  <Td>
                    <HStack alignItems="center">
                      <Avatar size="sm" name={user.user.name} src={user.user.avatar} />
                      <Box>
                        <Heading size="xs">{user.user.name}</Heading>
                      </Box>
                    </HStack>
                  </Td>
                  <Td isNumeric>{user.score}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default LeaderboardPage
