import { createTheme } from '@mui/material/styles';

export const colors = {
  orange: '#ff9217',
  orangeDark: '#e07a0f',
  orangeActive: 'rgba(0, 0, 0, 0.18)',
  black: '#000000',
  white: '#ffffff',
  text: '#000000',
  link: '#000000',
  greyBg: '#f5f5f5',
  border: '#e0e0e0',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.orange, contrastText: colors.black },
    secondary: { main: colors.black, contrastText: colors.white },
    background: { default: colors.white, paper: colors.white },
    text: { primary: colors.text, secondary: '#333333' },
  },
  typography: {
    fontFamily: '"PT Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: '35px',
      letterSpacing: '-0.55px',
      margin: '32px 0 0',
      textTransform: 'none',
    },
    h2: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 700,
      fontSize: '23px',
    },
    body1: {
      fontFamily: '"PT Sans", sans-serif',
      fontSize: '16px',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"PT Sans", sans-serif',
      fontWeight: 500,
      textTransform: 'uppercase',
      fontSize: '16px',
    },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: colors.white },
        a: { color: colors.link },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 0, boxShadow: 'none' },
        contained: {
          backgroundColor: colors.orange,
          color: colors.black,
          '&:hover': { backgroundColor: colors.orangeDark, boxShadow: 'none' },
        },
        text: {
          color: colors.black,
          '&:hover': { backgroundColor: 'transparent' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 1px 0 rgba(0,0,0,0.2), 0 3px 25px 0 rgba(0,0,0,0.12), 0 2px 6px 0 rgba(0,0,0,0.05)',
          borderRadius: '4px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { borderRadius: 0 },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
  },
});

export default theme;
