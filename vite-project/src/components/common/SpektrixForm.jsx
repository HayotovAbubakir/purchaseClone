import { Box, Typography, Button } from '@mui/material';
import { colors } from '../../theme/theme';

export function SpektrixIframeContent({ children, sx }) {
  return (
    <Box
      className="spektrix-iframe-content"
      sx={{
        width: '100%',
        fontFamily: '"PT Sans", sans-serif',
        fontSize: '16px',
        color: colors.text,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function SpektrixPanel({ children, sx }) {
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        bgcolor: '#fff',
        p: { xs: 2, md: 4 },
        maxWidth: 720,
        mx: 'auto',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function SpektrixCard({ children, sx }) {
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        bgcolor: '#fff',
        p: 2.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function SpektrixButton({ children, sx, ...props }) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        bgcolor: colors.orange,
        color: colors.black,
        borderRadius: 0,
        textTransform: 'uppercase',
        fontWeight: 500,
        fontSize: '16px',
        px: 2.5,
        py: 1,
        boxShadow: 'none',
        minWidth: 'auto',
        '&:hover': { bgcolor: colors.orangeDark, boxShadow: 'none' },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

export function SpektrixPageTitle({ children, sx }) {
  return (
    <Typography
      component="h1"
      sx={{
        fontWeight: 700,
        fontSize: '35px',
        letterSpacing: '-0.55px',
        mb: 3,
        mt: 0,
        fontFamily: '"PT Sans", sans-serif',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

export function SpektrixGreyBox({ children, sx }) {
  return (
    <Box
      sx={{
        bgcolor: '#f2f2f2',
        border: '1px solid #ddd',
        borderRadius: '4px',
        p: 2.5,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function SpektrixInfoBox({ children }) {
  return (
    <Box
      sx={{
        bgcolor: '#f5f5f5',
        border: '1px solid #ddd',
        p: 2,
        mb: 3,
        fontSize: '16px',
        lineHeight: 1.5,
      }}
    >
      {children}
    </Box>
  );
}

export function SpektrixFormRow({ label, required, children }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '160px 1fr auto' },
        gap: { xs: 0.5, sm: 2 },
        alignItems: 'start',
        mb: 2.5,
      }}
    >
      <Typography sx={{ fontSize: '16px', pt: { sm: 1 } }}>{label}</Typography>
      <Box>{children}</Box>
      {required && (
        <Typography sx={{ fontSize: '14px', color: '#666', pt: { sm: 1 }, display: { xs: 'none', sm: 'block' } }}>
          (required)
        </Typography>
      )}
    </Box>
  );
}

export function SpektrixInput({ sx, ...props }) {
  return (
    <Box
      component="input"
      sx={{
        width: '100%',
        border: '1px solid #999',
        p: '8px 10px',
        fontSize: '16px',
        fontFamily: '"PT Sans", sans-serif',
        boxSizing: 'border-box',
        bgcolor: '#fff',
        borderRadius: 0,
        '&:focus': { outline: '1px solid #666' },
        ...sx,
      }}
      {...props}
    />
  );
}

export function SpektrixCheckbox({ label, checked, onChange, defaultChecked }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
      <Box
        component="input"
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        sx={{ width: 16, height: 16, mt: 0.3 }}
      />
      <Typography sx={{ fontSize: '16px', lineHeight: 1.4 }}>{label}</Typography>
    </Box>
  );
}
