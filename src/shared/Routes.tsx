import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/header/Layout';
import MainPage from '../routes/MainPage';
import DetailPage from '../routes/DetailPage';
import ReservationDescpage from '../routes/ReservationDescpage';
import MyPage from '../routes/MyPage';
import Signup from '../routes/Signup';
import Login from '../routes/Login';
import ReservationPage from '../routes/ReservationPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/camp/:campId" element={<DetailPage />} />
          <Route
            path="/camp/:campId/campdesc"
            element={<ReservationDescpage />}
          />
          <Route
            path="/camp/:campId/campreservation"
            element={<ReservationPage />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
