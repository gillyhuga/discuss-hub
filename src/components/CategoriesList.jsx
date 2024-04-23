import PropTypes from 'prop-types';
import {
  Box, StackDivider, Stack, Button,
} from '@chakra-ui/react';

function CategoriesList({categories, handleCategoryClick, selectedCategory}) {
  return (
    <Box overflow='auto'>
      <Stack
        maxW='250px'
        direction={['row', 'column']}
        divider={<StackDivider borderColor='gray.200' />}
        spacing={1}
        align='stretch'
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            size='md'
            minW='auto'
            border='1px'
            borderColor='teal'
            colorScheme='teal'
            textTransform='lowercase'
            onClick={() => {
              handleCategoryClick(category);
            }}
            variant={selectedCategory === category ? 'solid' : 'outline'}
          >
            #
            {category}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
};

export default CategoriesList;
