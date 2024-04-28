import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {action} from '@storybook/addon-actions';
import ThreadDetail from '@/components/ThreadDetailCard';

export default {
  title: 'Thread Detail',
  component: ThreadDetail,
};

const Template = (args) => (
  <ChakraProvider>
    <ThreadDetail {...args} />
  </ChakraProvider>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 'thread-Np47p4jhUXYhrhRn',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    createdAt: '2023-05-29T07:55:52.266Z',
    owner: {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      avatar:
        'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    category: 'redux',
    comments: [],
    upVotesBy: ['user-83Wkop86jbYAdRR3', 'user-ebWk0yMx13V5Jg2r'],
    downVotesBy: ['user-w5oYYG_-1yeZDFmj'],
  },
  auth: {
    id: 'user-1234',
  },
};

export const WithTypeUpvote = Template.bind({});
WithTypeUpvote.args = {
  data: {
    ...Default.args.data,
    upVotesBy: [
      ...Default.args.data.upVotesBy,
      'user-1234',
    ],
  },
  upVote: action('upVote'),
  auth: {
    id: 'user-1234',
  },
};

export const WithTypeDownvote = Template.bind({});
WithTypeDownvote.args = {
  data: {
    ...Default.args.data,
    downVotesBy: [
      ...Default.args.data.downVotesBy,
      'user-1234',
    ],
  },
  downVote: action('downVote'),
  auth: {
    id: 'user-1234',
  },
};
