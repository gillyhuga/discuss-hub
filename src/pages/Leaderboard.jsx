import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Heading} from '@chakra-ui/react';
import {leaderboardThunks} from '@/store/leaderboards/action';
import LeaderboardTable from '@/components/LeaderboardTable';
import Loader from '@/components/Loader';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(leaderboardThunks.asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <div>
      <Heading as='h3' size='lg' py={5}>Leaderboards</Heading>
      {leaderboards.length === 0 ?
        (
          <Loader />
          ) :
        (
          <LeaderboardTable leaderboards={leaderboards} />
          )}
    </div>
  );
}

export default LeaderboardPage;
