import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import LeaderboardTable from '@/components/LeaderboardTable';

export default {
  title: 'Leaderboard Table',
  component: LeaderboardTable,
};

const Template = (args) => (
  <ChakraProvider>
    <LeaderboardTable {...args} />
  </ChakraProvider>
);

export const Default = Template.bind({});
Default.args = {
  leaderboards: [
    {
      user: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dicoding',
        email: 'admin@dicoding.com',
        avatar:
          'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      score: 25,
    },
    {
      user: {
        id: 'user-ebWk0yMx13V5Jg2r',
        name: 'Penghapus',
        email: 'penghapus@mail.com',
        avatar: 'https://ui-avatars.com/api/?name=Penghapus&background=random',
      },
      score: 5,
    },
    {
      user: {
        id: 'user-aROWej8yYA1sOfHN',
        name: 'Gilly',
        email: 'hello@gillyhuga.com',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      score: 0,
    },
  ],
};
