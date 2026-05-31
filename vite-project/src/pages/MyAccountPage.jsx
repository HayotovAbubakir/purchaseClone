import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Alert } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/theme';

export default function MyAccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  if (!user) {
    return (
      <PageContainer title="MY ACCOUNT">
        <Alert severity="info" sx={{ mb: 2 }}>Please sign in to view your account</Alert>
        <Button variant="contained" onClick={() => navigate('/LoginLogout')}>Sign In</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="MY ACCOUNT">
      <Typography sx={{ mb: 1, fontWeight: 700 }}>{user.firstName} {user.lastName}</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>{user.email}</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={() => navigate('/Events')}>Browse Events</Button>
        <Button variant="contained" onClick={() => navigate('/Basket')}>View Cart</Button>
        <Button variant="outlined" color="error" onClick={() => { logout(); navigate('/Events'); }}>Log Out</Button>
      </Box>
    </PageContainer>
  );
}
