import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { subNavLinks } from '../../data/catalog';
import { colors } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import LoginModal from '../auth/LoginModal';
import logoUrl from '../../assets/logo.png';

export const TOP_BAR_HEIGHT = 48;
export const SUB_NAV_HEIGHT = 58;
export const HEADER_OFFSET = TOP_BAR_HEIGHT + SUB_NAV_HEIGHT;
const LOGO_URL = 'https://app.spektrix-link.com/websites/purchase_lookingglasstheatre_org/logo-1771342918.069.png';

export function useScrollSubNav(enabled) {
  const [subNavVisible, setSubNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setSubNavVisible(true);
      return undefined;
    }

    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= SUB_NAV_HEIGHT) {
        setSubNavVisible(true);
      } else if (delta > 4) {
        setSubNavVisible(false);
      } else if (delta < -4) {
        setSubNavVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled]);

  return subNavVisible;
}

export default function Header({ subNavVisible = true }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { basketCount, basketTotal, user } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logoUrl);

  const isActive = (path) => {
    if (path === '/Donations') return location.pathname.startsWith('/Donations');
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  const openLoginModal = () => {
    setDrawerOpen(false);
    setLoginOpen(true);
  };

  const renderNavLink = (item) => {
    const active = !item.external && isActive(item.path);
    const sx = {
      color: colors.black,
      fontFamily: '"PT Sans", sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      textDecoration: 'none',
      px: 1,
      py: 0.5,
      whiteSpace: 'nowrap',
      backgroundColor: active ? colors.orangeActive : 'transparent',
      '&:hover': { backgroundColor: active ? colors.orangeActive : 'rgba(0,0,0,0.08)' },
    };

    if (item.external) {
      return (
        <Link key={item.label} href={item.path} target="_blank" rel="noopener noreferrer" sx={sx}>
          {item.label}
        </Link>
      );
    }

    return (
      <Link key={item.label} component={RouterLink} to={item.path} sx={sx}>
        {item.label}
      </Link>
    );
  };

  const renderLoginLink = (onClick, sx = {}) => {
    if (isMobile) {
      return null;
    }

    if (user) {
      return (
        <Link
          component={RouterLink}
          to="/MyAccount"
          onClick={onClick}
          sx={{
            color: colors.white,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            fontSize: '16px',
            textTransform: 'uppercase',
            ...sx,
          }}
        >
          <AccountCircleOutlinedIcon sx={{ fontSize: 24, opacity: 0.74 }} />
          MY ACCOUNT
        </Link>
      );
    }

    return (
      <Link
        component={RouterLink}
        to="/LoginLogout"
        onClick={onClick}
        sx={{
          color: colors.white,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          fontSize: '16px',
          textTransform: 'uppercase',
          ...sx,
        }}
      >
        <LoginIcon sx={{ fontSize: 24, opacity: 0.74 }} />
        LOGIN
      </Link>
    );
  };

  const logoLink = (
    <Link
      href="https://lookingglasstheatre.org/"
      target="_blank"
      rel="noopener noreferrer"
      sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
    >
      <Box
        component="img"
        src={logoSrc}
        alt="Company Logo"
        onError={() => setLogoSrc(LOGO_URL)}
        sx={{ height: 32, maxWidth: '100%', display: 'block', objectFit: 'contain' }}
      />
    </Link>
  );

  const cartLink = (
    <Link
      component={RouterLink}
      to="/Basket"
      sx={{
        color: colors.white,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        fontSize: '16px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      <ShoppingBasketOutlinedIcon sx={{ fontSize: 24, opacity: 0.74 }} />
      {isMobile ? (
        <>
          {basketCount} ${basketTotal.toFixed(2)}
        </>
      ) : (
        <>
          CART:{basketCount} ${basketTotal.toFixed(2)}
        </>
      )}
    </Link>
  );

  return (
    <>
      <AppBar position="fixed" className="custom-navbar" sx={{ bgcolor: colors.black, height: TOP_BAR_HEIGHT, boxShadow: 4, zIndex: 1200 }}>
        <Container maxWidth="xl" disableGutters={false}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: `${TOP_BAR_HEIGHT}px !important`,
              height: TOP_BAR_HEIGHT,
              px: { xs: 2, md: 3 },
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {isMobile ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <IconButton
                    color="inherit"
                    className="drawer-btn"
                    onClick={() => setDrawerOpen(true)}
                    aria-label="open drawer"
                    size="medium"
                    sx={{ ml: -1, color: colors.white, p: 1 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Box sx={{ ml: '15px', display: 'flex', alignItems: 'center' }}>{logoLink}</Box>
                </Box>

                <Box
                  className="custom-topbar-links"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                    color: colors.white,
                    fontFamily: '"PT Sans", sans-serif',
                    fontSize: '16px',
                  }}
                >
                  {cartLink}
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>{logoLink}</Box>
                <Box
                  className="custom-topbar-links"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    color: colors.white,
                    fontFamily: '"PT Sans", sans-serif',
                    fontSize: '16px',
                  }}
                >
                  {renderLoginLink()}
                  {cartLink}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        className="custom-menu"
        sx={{
          position: 'fixed',
          top: TOP_BAR_HEIGHT,
          left: 0,
          right: 0,
          zIndex: 1100,
          bgcolor: colors.orange,
          height: SUB_NAV_HEIGHT,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          transform: subNavVisible ? 'translateY(0)' : `translateY(-${SUB_NAV_HEIGHT}px)`,
          transition: 'transform 0.25s ease-in-out',
          willChange: 'transform',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5, flexWrap: 'nowrap', px: 2 }}>
          {subNavLinks.map((item) => renderNavLink(item))}
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          sx: {
            top: `${TOP_BAR_HEIGHT}px`,
            height: `calc(100% - ${TOP_BAR_HEIGHT}px)`,
          },
        }}
        sx={{
          zIndex: 1150,
          '& .MuiBackdrop-root': {
            top: TOP_BAR_HEIGHT,
            height: `calc(100% - ${TOP_BAR_HEIGHT}px)`,
          },
        }}
        PaperProps={{
          sx: {
            top: TOP_BAR_HEIGHT,
            height: `calc(100% - ${TOP_BAR_HEIGHT}px)`,
            width: '75vw',
            maxWidth: 320,
            bgcolor: colors.orange,
            boxShadow: 'none',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: colors.orange }}>
          <List sx={{ flex: 1, pt: 2, pb: 0 }}>
            {subNavLinks.map((item) => (
              <ListItemButton
                key={item.label}
                component={item.external ? Link : RouterLink}
                {...(item.external ? { href: item.path, target: '_blank' } : { to: item.path })}
                onClick={() => setDrawerOpen(false)}
                selected={!item.external && isActive(item.path)}
                sx={{
                  py: 1.75,
                  px: 2.5,
                  '&.Mui-selected': { bgcolor: colors.orangeActive },
                  '&.Mui-selected:hover': { bgcolor: colors.orangeActive },
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '16px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: colors.black,
                    fontFamily: '"PT Sans", sans-serif',
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Box
            sx={{
              bgcolor: colors.black,
              px: 2.5,
              py: 2,
              mt: 'auto',
            }}
          >
            {user ? (
              <Link
                component={RouterLink}
                to="/MyAccount"
                onClick={() => setDrawerOpen(false)}
                sx={{
                  color: colors.white,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  fontFamily: '"PT Sans", sans-serif',
                }}
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: 24, opacity: 0.74 }} />
                MY ACCOUNT
              </Link>
            ) : (
              <Box
                component="button"
                type="button"
                onClick={openLoginModal}
                sx={{
                  color: colors.white,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  fontFamily: '"PT Sans", sans-serif',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  p: 0,
                }}
              >
                <LoginIcon sx={{ fontSize: 24, opacity: 0.74 }} />
                LOGIN
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => navigate('/MyAccount')}
      />
    </>
  );
}
