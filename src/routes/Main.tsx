//페이지
import Home from './Home';
import Login from './Login';

const Main = () => {
  const loginStatus = localStorage.getItem('refreshToken');

  return !loginStatus ? <Login /> : <Home />;
};

export default Main;
