import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, Link } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import {
  SpektrixIframeContent,
  SpektrixPanel,
  SpektrixInfoBox,
  SpektrixFormRow,
  SpektrixInput,
  SpektrixButton,
} from '../components/common/SpektrixForm';
import RegisterModal from '../components/auth/RegisterModal';
import { colors } from '../theme/theme';
import { useApp, useDraft } from '../context/AppContext';

export default function LoginLogoutPage() {
  const navigate = useNavigate();
  const { user, login, logout } = useApp();
  const [email, setEmail] = useDraft('loginEmail', '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registerOpen, setRegisterOpen] = useState(false);

  if (user) {
    return (
      <PageContainer title="My Account">
        <Typography sx={{ mb: 2 }}>Welcome, {user.firstName} {user.lastName}</Typography>
        <SpektrixButton onClick={() => { logout(); navigate('/Events'); }} sx={{ mr: 2 }}>Log Out</SpektrixButton>
      </PageContainer>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email address'); return; }
    if (!password) { setError('Please enter your password'); return; }
    login({ email, firstName: 'Member', lastName: 'Guest' });
    navigate('/MyAccount');
  };

  const handleRegister = (newUser) => {
    login(newUser);
    setRegisterOpen(false);
    navigate('/MyAccount');
  };

  return (
    <PageContainer title="" maxWidth="xl">
      <SpektrixIframeContent>
        <SpektrixPanel>
          <Typography component="h1" sx={{ textAlign: 'center', fontWeight: 700, fontSize: '28px', mb: 3 }}>
            Login
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <SpektrixInfoBox>
            Please login to access your Lookingglass account. If you need additional assistance, please contact the box
            office at 312.337.0665.
          </SpektrixInfoBox>
          <Box component="form" onSubmit={handleLogin}>
            <SpektrixFormRow label="Email address:" required>
              <SpektrixInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </SpektrixFormRow>
            <SpektrixFormRow label="Password:" required>
              <SpektrixInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </SpektrixFormRow>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
              <SpektrixButton type="submit">Login</SpektrixButton>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center', fontSize: '16px' }}>
            <Typography sx={{ mb: 1 }}>
              New Customer?{' '}
              <Link
                component="button"
                type="button"
                sx={{ color: colors.text, cursor: 'pointer', border: 'none', background: 'none', font: 'inherit', p: 0 }}
                onClick={() => setRegisterOpen(true)}
              >
                Register now
              </Link>
            </Typography>
            <Typography>
              Forgot your password?{' '}
              <Link component="button" type="button" sx={{ color: colors.text, cursor: 'pointer', border: 'none', background: 'none', font: 'inherit', p: 0 }}>
                Reset here
              </Link>
            </Typography>
          </Box>
        </SpektrixPanel>
      </SpektrixIframeContent>

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onRegister={handleRegister}
      />
    </PageContainer>
  );
}
