import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {action} from '@storybook/addon-actions';
import CommentCard from '@/components/CommentCard';

export default {
  title: 'Comment Card',
  component: CommentCard,
};

const Template = (args) => (
  <ChakraProvider>
    <CommentCard {...args} />
  </ChakraProvider>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 'comment-abc123',
    content: 'This is a sample comment.',
    createdAt: '2023-05-29T07:55:52.266Z',
    owner: {
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
  },
  auth: {
    id: 'user-123',
  },
};

export const WithTypeUpvote = Template.bind({});
WithTypeUpvote.args = {
  data: {
    ...Default.args.data,
    upVotesBy: [
      ...Default.args.data.upVotesBy,
      'user-123',
    ],
  },
  upVote: action('upVote'),
  auth: {
    id: 'user-123',
  },
};

export const WithTypeDownvote = Template.bind({});
WithTypeDownvote.args = {
  data: {
    ...Default.args.data,
    downVotesBy: [
      ...Default.args.data.downVotesBy,
      'user-123',
    ],
  },
  downVote: action('downVote'),
  auth: {
    id: 'user-123',
  },
};