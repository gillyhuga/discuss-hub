import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react'
import {
  RiThumbUpLine,
  RiThumbDownLine,
  RiChat4Line,
  RiShareFill
} from 'react-icons/ri'
import { formatDate } from '@/utils/date-format'
import { useState } from 'react'

function HomePage (): JSX.Element {
  const threadsData = [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'category',
      createdAt: '2023-05-29T07:55:52.266Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    },
    {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'test2',
      createdAt: '2024-03-12T04:42:29.887Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    },
    {
      id: 'thread-3',
      title: 'Thread Ketiga',
      body: 'Ini adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketigaIni adalah thread ketiga',
      category: 'test2',
      createdAt: '2024-03-12T04:42:29.887Z',
      ownerId: 'users-3',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    },
    {
      id: 'thread-4',
      title: 'Thread Keempat',
      body: 'Ini adalah thread keempat',
      category: 'gene3ral',
      createdAt: '2024-03-12T04:42:29.887Z',
      ownerId: 'users-4',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    }
  ]

  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useState(() => {
    const uniqueCategories = [...new Set(threadsData.map(thread => thread.category))]
    setCategories(uniqueCategories)
  })

  const handleCategoryClick = (category: string): void => {
    setSelectedCategory(prevCategory => (prevCategory === category ? null : category))
  }

  const filteredThreadsData = (selectedCategory != null)
    ? threadsData.filter(thread => thread.category === selectedCategory)
    : threadsData

  return (
    <div>
      <Grid
        templateRows='(2, 1fr)'
        templateColumns={{ base: '1fr', md: 'repeat(5, 1fr)' }}
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Heading as='h3' size='lg' py={5}>Topics</Heading>
          <Box overflow="auto">
            <Stack
              maxW={'250px'}
              direction={['row', 'column']}
              divider={<StackDivider borderColor='gray.200' />}
              spacing={1}
              align='stretch'
            >
              {categories.map((category, index) => (
                <Button
                  key={index}
                  size='md'
                  minW={30}
                  border='1px'
                  borderColor='teal'
                  colorScheme='teal'
                  textTransform="lowercase"
                  onClick={() => { handleCategoryClick(category) }}
                  variant={selectedCategory === category ? 'solid' : 'outline'}
                >
                  #{category}
                </Button>
              ))}
            </Stack>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 4 }}>
          <Heading as='h3' size='lg' py={5}>Create Post</Heading>
          <Card>
            <CardBody>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="User" />
                  <Box>
                    <Heading size="sm">User</Heading>
                  </Box>
                </Flex>
              </Flex>
              <FormControl>
                <VStack
                  align='stretch'
                  pt={4}
                >
                  <Input placeholder='Title' />
                  <Input placeholder='Category' />
                  <Textarea placeholder='What do you think?' />
                  <Button colorScheme='teal'>Send</Button>
                </VStack>
              </FormControl>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 4 }}>
          <Heading as='h3' size='lg' py={5}>Threads</Heading>
          <Stack spacing="4">
            {filteredThreadsData.map((thread, index) => (
              <Card key={index}>
                <CardBody>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar name={thread.ownerId} />
                      <Box>
                        <Heading size="sm">{thread.ownerId}</Heading>
                        <Text>{formatDate(thread.createdAt)}</Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Badge mt="6" p='3px 10px' rounded="lg" textTransform="lowercase">
                    #{thread.category}
                  </Badge>
                  <Stack mt="2" spacing="2">
                    <Heading as="h4" size="md">
                      {thread.title}
                    </Heading>
                    <Text noOfLines={2}>
                      {thread.body}
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <HStack spacing="1">
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
                      {thread.totalComments}
                    </Button>
                    <IconButton
                      size="sm"
                      variant="outline"
                      aria-label="Share to friends"
                      icon={<RiShareFill />}
                    />
                  </HStack>
                </CardFooter>
              </Card>
            ))}
          </Stack>
        </GridItem>
      </Grid>

    </div>
  )
}

export default HomePage
