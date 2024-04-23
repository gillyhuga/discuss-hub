import {Link} from 'react-router-dom';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Spacer,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import {RiDiscussLine, RiTrophyLine, RiAlignJustify} from 'react-icons/ri';
import {useSelector, useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
import {unsetAuthAction} from '@/store/auth/action';

const navLinks = [
  {name: 'Threads', to: '/', icon: RiDiscussLine},
  {name: 'Leaderboards', to: '/leaderboards', icon: RiTrophyLine},
];

export function Header() {
  const {isOpen, onToggle, onClose} = useDisclosure();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    onToggle();
  };

  const closeDrawer = () => {
    onClose();
  };

  function logout() {
    dispatch(unsetAuthAction());
    localStorage.removeItem('accessToken');
    toast.success('Successfully logout!');
    closeDrawer();
  }

  const handleMenuItemClick = () => {
    closeDrawer();
  };

  return (
    <>
      <Stack justify="space-between" py={4} w="full" direction={['row']}>
        <Heading fontSize="xl">DiscusHub</Heading>
        <Spacer />
        <IconButton
          aria-label="Toggle Navigation"
          icon={<RiAlignJustify style={{display: 'block', margin: 'auto'}} />}
          display={['block', 'none']}
          onClick={toggleDrawer}
        />
        <Stack
          align="center"
          spacing={[4]}
          direction="row"
          display={['none', 'flex']}
        >
          {navLinks.map((navLink, i) => (
            <Link
              key={i}
              to={navLink.to}
              style={{display: 'flex', alignItems: 'center'}}
            >
              <navLink.icon style={{margin: '0 6px'}} />
              {navLink.name}
            </Link>
          ))}
          <Spacer />
          {auth === null ? (
            <>
              <Button
                as={Link}
                to="/login"
                colorScheme="teal"
                variant="outline"
                size="sm"
              >
                Login
              </Button>
              <Button as={Link} to="/register" colorScheme="teal" size="sm">
                Register
              </Button>
            </>
          ) : (
            <Button colorScheme="teal" size="sm" type="button" onClick={logout}>
              <p>Logout</p>
            </Button>
          )}
        </Stack>
      </Stack>
      <Drawer placement="right" onClose={closeDrawer} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>DiscusHub</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {navLinks.map((navLink, i) => (
                <Link
                  key={i}
                  to={navLink.to}
                  style={{display: 'flex', alignItems: 'center'}}
                  onClick={handleMenuItemClick}
                >
                  <navLink.icon style={{margin: '0 6px'}} />
                  {navLink.name}
                </Link>
              ))}
              {auth === null ? (
                <>
                  <Button
                    onClick={handleMenuItemClick}
                    as={Link}
                    to="/login"
                    colorScheme="teal"
                    variant="outline"
                    size="sm"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleMenuItemClick}
                    as={Link}
                    to="/register"
                    colorScheme="teal"
                    size="sm"
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Button
                  colorScheme="teal"
                  size="sm"
                  type="button"
                  onClick={logout}
                >
                  <p>Logout</p>
                </Button>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
