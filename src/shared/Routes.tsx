import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DetailPage from '../routes/DetailPage';
import ReservationDescpage from '../routes/ReservationDescpage';
import MyPage from '../routes/MyPage';
import Signup from '../routes/Signup';
import Login from '../routes/Login';
// import ReservationPage from '../routes/ReservationPage';
import Main from '../routes/Main';
import ProfileModify from '../routes/ProfileModify';
import OAuthKakao from '../routes/OAuthKakao';
import OAuthNaver from '../routes/OAuthNaver';
import OAuthGoogle from '../routes/OAuthGoogle';
import Search from '../routes/Search';
import SocialSignup from '../routes/SocialSignup';
import Wrapper from '../routes/Wrapper';
import useAnalytics from '../hooks/useAnalytics';

const Router = () => {
  const { initialized } = useAnalytics();

  return (
    <BrowserRouter>
      <Layout>
        <Wrapper initialized={initialized}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/camp/:campId" element={<DetailPage />} />
            <Route
              path="/camp/:campId/sitedesc/:siteId"
              element={<ReservationDescpage />}
            />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/edit" element={<ProfileModify />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/api/auths/kakao" element={<OAuthKakao />} />
            <Route path="api/auths/naver" element={<OAuthNaver />} />
            <Route path="api/auths/google" element={<OAuthGoogle />} />
            <Route path="/socialsignup" element={<SocialSignup />} />
          </Routes>
        </Wrapper>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
