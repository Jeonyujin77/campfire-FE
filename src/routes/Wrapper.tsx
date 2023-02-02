import * as React from 'react';
import ReactGa from 'react-ga';
import { useLocation } from 'react-router-dom';

interface WrapperProps {
  initialized: boolean;
  children: React.PropsWithChildren<any>;
}

const Wrapper = (props: WrapperProps) => {
  const location = useLocation();

  React.useEffect(() => {
    //ReactGA가 시작되면, 구글 애널리틱스로 페이지 변화를 보낸다.
    if (props.initialized) {
      ReactGa.pageview(location.pathname + location.search);
    }
  }, [props.initialized, location]);

  return props.children;
};

export default Wrapper;
