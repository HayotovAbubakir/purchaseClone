import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { footerLinks } from '../../data/catalog';
import { colors } from '../../theme/theme';

export default function Footer({ showSpektrix = false }) {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: 3,
        pb: showSpektrix ? 2 : 4,
        borderTop: `1px solid ${colors.border}`,
        bgcolor: colors.white,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                component={RouterLink}
                to={link.path}
                sx={{
                  color: colors.text,
                  textDecoration: 'none',
                  fontFamily: '"PT Sans", sans-serif',
                  fontSize: '16px',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
          {showSpektrix && (
            <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
              box office powered by <strong>SPEKTRIX</strong>
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
