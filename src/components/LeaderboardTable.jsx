import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

function LeaderboardTable({leaderboards}) {
  return (
    <Card>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboards.map((user, index) => (
              <Tr key={index}>
                <Td>
                  <HStack alignItems="center">
                    <Avatar
                      size="sm"
                      name={user.user.name}
                      src={user.user.avatar}
                    />
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
  );
}

LeaderboardTable.propTypes = {
  leaderboards: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
        }).isRequired,
        score: PropTypes.number.isRequired,
      }),
  ).isRequired,
};

export default LeaderboardTable;
