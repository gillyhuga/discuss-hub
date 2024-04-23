import {Outlet} from 'react-router-dom';
import {Container} from '@chakra-ui/react';
import {Toaster} from 'react-hot-toast';
import {Header} from './Header';
import LoadingBar from './LoadingBar';

function Layout() {
  return (
    <>
      <LoadingBar />
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
      <Container maxW={['full', 'container.lg']} px={4}>
        <Header />
        <Outlet />
      </Container>
    </>

  );
}

export default Layout;
