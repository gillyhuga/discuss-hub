import {useEffect} from 'react';
import {Flex} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {sharedThunks} from '@/store/shared/action';
import RegisterForm from '@/components/RegisterForm';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const preload = useSelector((state) => state.preload);

  useEffect(() => {
    if (preload === true && auth !== null) {
      navigate('/');
    }
  }, [preload, auth, navigate]);

  const handleRegister = async (formData) => {
    dispatch(
        sharedThunks.asyncRegisterAndLogin(formData),
    );
  };

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <RegisterForm onRegister={handleRegister} />
    </Flex>
  );
}

export default RegisterPage;
