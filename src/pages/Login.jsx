import {Flex} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoginForm from '@/components/LoginForm';
import {authThunks} from '@/store/auth/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((states) => states.auth);
  const preload = useSelector((states) => states.preload);

  useEffect(() => {
    if (preload === true && auth !== null) {
      navigate('/');
    }
  }, [preload, auth, navigate]);

  const handleLogin = (formData) => {
    dispatch(authThunks.asyncSetAuth(formData));
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <LoginForm onLogin={handleLogin} />
    </Flex>
  );
}

export default LoginPage;
