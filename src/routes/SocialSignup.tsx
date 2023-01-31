//라이브러리
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
//컴포넌트
import LogLogo from '../components/common/LogLogo';
import SocialSignupBox from '../components/users/socialSignupBox';

const SocialSignup = () => {
  const { pathname } = useLocation();
  const { email, profileImg, provider, userName, snsId } = useLocation().state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Wrap>
      <LogLogo />
      <SocialSignupBox
        kakaoemail={email}
        kakaoprofileImg={profileImg}
        kakaoprovider={provider}
        kakaouserName={userName}
        kakaosnsId={snsId}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 0px auto;
  margin-top: 100px;
  width: 1180px;
  max-height: 100%;
  min-height: 35vh;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 0px;
    padding: 0px;
  }
`;

export default SocialSignup;
