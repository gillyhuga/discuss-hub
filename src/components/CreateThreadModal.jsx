import {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

function CreateThreadModal({isOpen, onClose, onCreateThread}) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    body: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateThread(formData);
    setFormData({
      title: '',
      category: '',
      body: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Thread</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl id='title'>
              <FormLabel>Title</FormLabel>
              <Input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl id='category' mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                type='text'
                name='category'
                value={formData.category}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl id='body' mt={4}>
              <FormLabel>Body</FormLabel>
              <Textarea
                name='body'
                value={formData.body}
                onChange={handleChange}
                required
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr={3} type='submit'>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

CreateThreadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateThread: PropTypes.func.isRequired,
};

export default CreateThreadModal;
