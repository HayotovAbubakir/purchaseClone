import { useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import {
  SpektrixFormRow,
  SpektrixInput,
  SpektrixButton,
  SpektrixInfoBox,
} from '../common/SpektrixForm';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterForm({ onSuccess, onCancel, showCancel = false }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName.trim()) {
      setError('Please enter your first name');
      return;
    }
    if (!form.lastName.trim()) {
      setError('Please enter your last name');
      return;
    }
    if (!form.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!form.password) {
      setError('Please enter your password');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    onSuccess({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography component="h2" sx={{ textAlign: 'center', fontWeight: 700, fontSize: '28px', mb: 3 }}>
        Register
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <SpektrixInfoBox>
        Create a Lookingglass account to manage your tickets and donations. Fields marked (required) must be completed.
      </SpektrixInfoBox>

      <SpektrixFormRow label="First name:" required>
        <SpektrixInput type="text" value={form.firstName} onChange={update('firstName')} />
      </SpektrixFormRow>
      <SpektrixFormRow label="Last name:" required>
        <SpektrixInput type="text" value={form.lastName} onChange={update('lastName')} />
      </SpektrixFormRow>
      <SpektrixFormRow label="Email address:" required>
        <SpektrixInput type="email" value={form.email} onChange={update('email')} />
      </SpektrixFormRow>
      <SpektrixFormRow label="Password:" required>
        <SpektrixInput type="password" value={form.password} onChange={update('password')} />
      </SpektrixFormRow>
      <SpektrixFormRow label="Confirm password:" required>
        <SpektrixInput type="password" value={form.confirmPassword} onChange={update('confirmPassword')} />
      </SpektrixFormRow>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, mb: showCancel ? 0 : 1 }}>
        {showCancel && (
          <SpektrixButton type="button" onClick={onCancel} sx={{ bgcolor: '#eee', color: '#000', '&:hover': { bgcolor: '#ddd' } }}>
            Cancel
          </SpektrixButton>
        )}
        <SpektrixButton type="submit">Register</SpektrixButton>
      </Box>
    </Box>
  );
}
