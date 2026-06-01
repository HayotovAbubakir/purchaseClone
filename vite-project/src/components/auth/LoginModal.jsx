import { useState } from 'react';
import { Dialog, DialogContent, IconButton, Box, Typography, Alert, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  SpektrixPanel,
  SpektrixInfoBox,
  SpektrixFormRow,
  SpektrixInput,
  SpektrixButton,
} from '../common/SpektrixForm';
import RegisterModal from './RegisterModal';
import { colors } from '../../theme/theme';
import { useApp, useDraft } from '../../context/AppContext';

export default function LoginModal({ open, onClose, onSuccess }) {
  const { login } = useApp();
  const [email, setEmail] = useDraft('loginEmail', '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleClose = () => {
    setError('');
    setPassword('');
    onClose();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    login({ email, firstName: 'Member', lastName: 'Guest' });
    handleClose();
    onSuccess?.();
  };

  const handleRegister = (newUser) => {
    login(newUser);
    setRegisterOpen(false);
    handleClose();
    onSuccess?.();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 0, maxWidth: 720, m: 2 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1, pr: 1 }}>
          <IconButton onClick={handleClose} aria-label="Close login" size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ pt: 0, px: { xs: 2, md: 4 }, pb: 4 }}>
          <SpektrixPanel sx={{ border: 'none', p: { xs: 1, md: 2 }, boxShadow: 'none' }}>
            <Typography component="h1" sx={{ textAlign: 'center', fontWeight: 700, fontSize: '28px', mb: 3 }}>
              Login
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <SpektrixInfoBox>
              Please login to access your Lookingglass account. If you need additional assistance, please contact the
              box office at 312.337.0665.
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
                <Link
                  component="button"
                  type="button"
                  sx={{ color: colors.text, cursor: 'pointer', border: 'none', background: 'none', font: 'inherit', p: 0 }}
                >
                  Reset here
                </Link>
              </Typography>
            </Box>
          </SpektrixPanel>
        </DialogContent>
      </Dialog>

      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} onRegister={handleRegister} />
    </>
  );
}
