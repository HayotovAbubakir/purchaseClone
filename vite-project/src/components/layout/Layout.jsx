import { useMediaQuery, useTheme } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Header, { TOP_BAR_HEIGHT, HEADER_OFFSET, useScrollSubNav } from './Header';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const subNavVisible = useScrollSubNav(!isMobile);
  const headerOffset = isMobile ? TOP_BAR_HEIGHT : (subNavVisible ? HEADER_OFFSET : TOP_BAR_HEIGHT);
  const showSpektrix = ['/GiftVouchers', '/Basket', '/Checkout', '/ChooseSeats'].some((p) =>
    location.pathname.startsWith(p),
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#fff' }}>
      <Header subNavVisible={subNavVisible} />
      <Box
        component="main"
        id="main"
        sx={{
          flexGrow: 1,
          pt: `${headerOffset}px`,
          pb: 4,
          transition: 'padding-top 0.25s ease-in-out',
        }}
      >
        <Outlet />
      </Box>
      <Footer showSpektrix={showSpektrix} />
    </Box>
  );
}
