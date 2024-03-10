import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  Heading,
  IconButton,
  Stack,
  Text
} from '@chakra-ui/react'
import {
  RiThumbUpLine,
  RiThumbDownLine,
  RiChat4Line,
  RiShareFill
} from 'react-icons/ri'

function HomePage (): JSX.Element {
  return (
    <div>
      <Stack spacing="4">
        <Card>
          <CardBody>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name="Segun Adebayo" />
                <Box>
                  <Heading size="sm">Segun Adebayo</Heading>
                  <Text>273 hari lalu</Text>
                </Box>
              </Flex>
            </Flex>
            <Stack mt="6" spacing="2">
              <Heading as="h4" size="md">
                (lg) In love with React & Next
              </Heading>
              <Text noOfLines={2}>
                Description
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <HStack spacing="2">
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button leftIcon={<RiThumbUpLine />}>
                  Upvote • 1
                </Button>
                <IconButton
                  aria-label="Add to friends"
                  icon={<RiThumbDownLine />}
                />
              </ButtonGroup>

              <Button size="sm" variant="outline" leftIcon={<RiChat4Line />}>
                44k
              </Button>

              <IconButton
                size="sm"
                variant="outline"
                aria-label="Add to friends"
                icon={<RiShareFill />}
              />
            </HStack>
          </CardFooter>
        </Card>
      </Stack>
    </div>
  )
}

export default HomePage
