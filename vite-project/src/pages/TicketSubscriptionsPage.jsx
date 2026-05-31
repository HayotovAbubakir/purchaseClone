import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Grid, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import PageContainer from '../components/common/PageContainer';
import { ticketSubscriptions } from '../data/catalog';
import { useApp } from '../context/AppContext';

export default function TicketSubscriptionsPage() {
  const navigate = useNavigate();
  const { addToBasket } = useApp();
  const [snackbar, setSnackbar] = useState(false);

  const handleSubscribe = (sub) => {
    addToBasket({
      key: `sub-${sub.id}`,
      type: 'subscription',
      eventName: sub.name,
      instanceLabel: sub.description,
      price: sub.price,
    });
    setSnackbar(true);
  };

  return (
    <PageContainer title="Ticket Subscriptions" subtitle="Flexible passes for the theatre lover">
      <Grid container spacing={3}>
        {ticketSubscriptions.map((sub, i) => (
          <Grid item xs={12} md={6} key={sub.id}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              sx={{ p: 4, height: '100%' }}
            >
              <Typography variant="h5" gutterBottom>{sub.name}</Typography>
              <Typography variant="h4" color="secondary" gutterBottom>${sub.price}</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>{sub.description}</Typography>
              <Button variant="contained" onClick={() => handleSubscribe(sub)}>Subscribe</Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button sx={{ mt: 3 }} onClick={() => navigate('/Basket')}>View Basket</Button>
      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)} message="Subscription added to basket" />
    </PageContainer>
  );
}
