import {Button, Grid, GridItem, Heading} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {sharedThunks} from '@/store/shared/action';
import ThreadList from '@/components/ThreadList';
import CategoriesList from '@/components/CategoriesList';
import {threadsThunks} from '@/store/threads/action';
import Loader from '@/components/Loader';
import CreateThreadModal from '@/components/CreateThreadModal';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector((states) => states.users);
  const auth = useSelector((states) => states.auth);
  const threads = useSelector((states) => states.threads);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(sharedThunks.asyncUsersAndThreads());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
            prevCategory === category ? null : category,
    );
  };

  const onUpVoteHandler = (id) => {
    dispatch(threadsThunks.asyncUpVoteThread(id));
  };

  const onDownVoteHandler = (id) => {
    dispatch(threadsThunks.asyncDownVoteThread(id));
  };

  const filteredThreads = selectedCategory ?
        threads.filter((thread) => thread.category === selectedCategory) :
        threads;

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread?.ownerId),
    authUser: auth === null ? auth : auth.id,
  }));
  const categories = [...new Set(threads.map((thread) => thread.category))];

  const openModal = () => {
    if (!auth) {
      navigate('/login');
      toast.error('Please login first.');
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateThread = (threadData) => {
    dispatch(threadsThunks.asyncCreateThread(threadData));
  };

  return (
    <div>
      <Grid
        templateRows="(2, 1fr)"
        templateColumns={{base: '1fr', md: 'repeat(5, 1fr)'}}
        gap={4}
      >
        <CreateThreadModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreateThread={handleCreateThread}
        />
        <GridItem rowSpan={2} colSpan={1}>
          <Heading as="h3" size="lg" py={5}>
                        Topics
          </Heading>
          <CategoriesList
            categories={categories}
            handleCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        </GridItem>
        <GridItem colSpan={{base: 1, md: 4}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Heading as="h3" size="lg" py={5} style={{margin: 0}}>
                            Threads
            </Heading>
            <Button colorScheme="teal" onClick={openModal}>
                            Create Thread
            </Button>
          </div>
          {threads.length === 0 ? (
                        <Loader />
                    ) : (
                        <ThreadList
                          data={threadList}
                          upVote={onUpVoteHandler}
                          downVote={onDownVoteHandler}
                        />
                    )}
        </GridItem>
      </Grid>
    </div>
  );
}

export default HomePage;
