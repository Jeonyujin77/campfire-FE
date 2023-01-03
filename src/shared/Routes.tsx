import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../routes/MainPage';
import DetailPage from '../routes/DetailPage';
import ReservationDescpage from '../routes/ReservationDescpage';
import Signup from '../routes/Signup';
import Login from '../routes/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/camp/:campId" element={<DetailPage />} />
        <Route
          path="/camp/:campId/campdesc"
          element={<ReservationDescpage />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
