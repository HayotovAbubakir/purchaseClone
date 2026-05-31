import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Grid, Alert, FormControlLabel, Radio, RadioGroup, CircularProgress } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import { useApp, useDraft } from '../context/AppContext';
import { colors } from '../theme/theme';

const defaultCheckoutDraft = {
  delivery: 'email',
  firstName: '',
  lastName: '',
  email: '',
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { basket, basketTotal, clearBasket, user } = useApp();
  const [checkoutDraft, setCheckoutDraft] = useDraft('checkout', {
    ...defaultCheckoutDraft,
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '' });

  const updateDraft = (field, value) => {
    setCheckoutDraft((prev) => ({ ...prev, [field]: value }));
  };

  if (basket.length === 0 && !complete) {
    return (
      <PageContainer title="Checkout">
        <Alert severity="warning">Your cart is empty</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/Events')}>Browse Events</Button>
      </PageContainer>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComplete(true);
      clearBasket();
    }, 1500);
  };

  if (complete) {
    return (
      <PageContainer title="Order Complete">
        <Typography sx={{ mb: 3, color: 'success.main', fontWeight: 700 }}>Thank you for your order!</Typography>
        <Button variant="contained" onClick={() => navigate('/Events')}>Back to Events</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Checkout">
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>Contact Information</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  required
                  fullWidth
                  size="small"
                  value={checkoutDraft.firstName}
                  onChange={(e) => updateDraft('firstName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  required
                  fullWidth
                  size="small"
                  value={checkoutDraft.lastName}
                  onChange={(e) => updateDraft('lastName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  type="email"
                  required
                  fullWidth
                  size="small"
                  value={checkoutDraft.email}
                  onChange={(e) => updateDraft('email', e.target.value)}
                />
              </Grid>
            </Grid>

            <Typography sx={{ fontWeight: 700, mb: 2 }}>Payment</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <TextField
                  label="Card Number"
                  required
                  fullWidth
                  size="small"
                  value={payment.cardNumber}
                  onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Expiry"
                  required
                  fullWidth
                  size="small"
                  value={payment.expiry}
                  onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  required
                  fullWidth
                  size="small"
                  value={payment.cvv}
                  onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                />
              </Grid>
            </Grid>

            <RadioGroup
              value={checkoutDraft.delivery}
              onChange={(e) => updateDraft('delivery', e.target.value)}
              sx={{ mb: 3 }}
            >
              <FormControlLabel value="email" control={<Radio />} label="Email (Print at Home)" />
              <FormControlLabel value="willcall" control={<Radio />} label="Will Call" />
            </RadioGroup>

            <Button type="submit" variant="contained" disabled={loading} sx={{ bgcolor: colors.orange, color: colors.black }}>
              {loading ? <CircularProgress size={24} /> : `Pay $${basketTotal.toFixed(2)}`}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography sx={{ fontWeight: 700, mb: 2 }}>Order Summary</Typography>
          {basket.map((item) => (
            <Box key={item.key} sx={{ mb: 2 }}>
              <Typography fontWeight={700}>{item.eventName}</Typography>
              <Typography variant="body2" color="text.secondary">{item.instanceLabel}</Typography>
              <Typography align="right">${item.price.toFixed(2)}</Typography>
            </Box>
          ))}
          <Typography variant="h6" align="right">Total: ${basketTotal.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
