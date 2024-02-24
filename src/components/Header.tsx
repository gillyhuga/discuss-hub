import { Link } from 'react-router-dom';
import { Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading, IconButton, Spacer, Stack, useDisclosure } from "@chakra-ui/react";
import { RiDiscussLine, RiTrophyLine, RiAlignJustify } from "react-icons/ri";

const navLinks = [
    { name: "Threads", to: "/", icon: RiDiscussLine },
    { name: "Leaderboards", to: "/leaderboards", icon: RiTrophyLine },
];

export const Header = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const toggleDrawer = () => {
        onToggle();
    };

    const closeDrawer = () => {
        onClose();
    };

    return (
        <Container maxW={["full", "container.lg"]} p={0}>
            <Stack justify="space-between" p={4} w="full" direction={["row"]}>
                <Heading fontSize="xl">DiscusHub</Heading>
                <Spacer />
                <IconButton
                    aria-label="Toggle Navigation"
                    icon={<RiAlignJustify style={{ display: 'block', margin: 'auto' }} />}
                    display={["block", "none"]}
                    onClick={toggleDrawer}
                />
                <Stack
                    align="center"
                    spacing={[4]}
                    direction={"row"}
                    display={["none", "flex"]}
                >
                    {navLinks.map((navLink, i) => (
                        <Link
                            key={i}
                            to={navLink.to}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            {<navLink.icon style={{ margin: '0 6px' }} />}
                            {navLink.name}
                        </Link>
                    ))}
                    <Spacer />
                    <Button colorScheme='teal' variant='outline' size='sm'>Login</Button>
                    <Button colorScheme='teal' size='sm'>Register</Button>
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
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    {<navLink.icon style={{ margin: '0 6px' }} />}
                                    {navLink.name}
                                </Link>
                            ))}
                            <Button colorScheme='teal' variant='outline' size='sm'>Login</Button>
                            <Button colorScheme='teal' size='sm'>Register</Button>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Container>
    );
};
