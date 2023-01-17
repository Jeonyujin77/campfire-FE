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
import Search from '../routes/Search';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/camp/:campId" element={<DetailPage />} />
          <Route
            path="/camp/:campId/sitedesc/:siteId"
            element={<ReservationDescpage />}
          />
          {/* <Route
            path="/camp/:campId/sitereservation/:siteId"
            element={<ReservationPage />}
          /> */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/edit" element={<ProfileModify />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/auths/kakao" element={<OAuthKakao />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
