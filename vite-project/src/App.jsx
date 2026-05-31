import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import EventsPage from './pages/EventsPage';
import EventAvailabilityPage from './pages/EventAvailabilityPage';
import ChooseSeatsPage from './pages/ChooseSeatsPage';
import BasketPage from './pages/BasketPage';
import CheckoutPage from './pages/CheckoutPage';
import DonationsPage from './pages/DonationsPage';
import GiftVouchersPage from './pages/GiftVouchersPage';
import LoginLogoutPage from './pages/LoginLogoutPage';
import MyAccountPage from './pages/MyAccountPage';
import MembershipsPage from './pages/MembershipsPage';
import RegisterPage from './pages/RegisterPage';
import StaticPage from './pages/StaticPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/Events" replace />} />
              <Route path="Events" element={<EventsPage />} />
              <Route path="EventAvailability" element={<EventAvailabilityPage />} />
              <Route path="ChooseSeats/:id" element={<ChooseSeatsPage />} />
              <Route path="Basket" element={<BasketPage />} />
              <Route path="Checkout" element={<CheckoutPage />} />
              <Route path="Donations" element={<DonationsPage />} />
              <Route path="GiftVouchers" element={<GiftVouchersPage />} />
              <Route path="LoginLogout" element={<LoginLogoutPage />} />
              <Route path="Register" element={<RegisterPage />} />
              <Route path="NewAccount" element={<RegisterPage />} />
              <Route path="MyAccount" element={<MyAccountPage />} />
              <Route path="Memberships" element={<MembershipsPage />} />
              <Route path="privacy" element={<StaticPage title="Privacy Policy" body="Privacy policy content." />} />
              <Route path="tandc" element={<StaticPage title="Terms & Conditions" body="Terms and conditions content." />} />
              <Route path="Signup" element={<StaticPage title="Join Our Email List" body="Sign up for email updates from Lookingglass Theatre Company." />} />
              <Route path="*" element={<Navigate to="/Events" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
