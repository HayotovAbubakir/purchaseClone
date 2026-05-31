import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import PageContainer from '../components/common/PageContainer';
import { merchandise } from '../data/catalog';
import { useApp } from '../context/AppContext';

export default function MerchandisePage() {
  const navigate = useNavigate();
  const { addToBasket } = useApp();
  const [snackbar, setSnackbar] = useState(false);

  const collections = [...new Set(merchandise.map((m) => m.collection))];

  const handleAdd = (item) => {
    addToBasket({
      key: `merch-${item.id}`,
      type: 'merchandise',
      eventName: item.name,
      instanceLabel: item.collection,
      price: item.price,
    });
    setSnackbar(true);
  };

  return (
    <PageContainer title="Merchandise" subtitle="GRAB SOME GEAR — support Lookingglass Theatre">
      {collections.map((collection) => (
        <BoxSection key={collection} title={collection} items={merchandise.filter((m) => m.collection === collection)} onAdd={handleAdd} />
      ))}

      <Button sx={{ mt: 3 }} onClick={() => navigate('/Basket')}>View Basket</Button>
      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)} message="Added to basket" />
    </PageContainer>
  );
}

function BoxSection({ title, items, onAdd }) {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontFamily: '"Roboto Condensed", sans-serif' }}>{title}</Typography>
      <Grid container spacing={3}>
        {items.map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <CardMedia component="img" height="200" image={item.imageUrl} alt={item.name} sx={{ objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700}>{item.name}</Typography>
                <Typography variant="h6" color="secondary">${item.price.toFixed(2)}</Typography>
                <Button variant="contained" size="small" fullWidth sx={{ mt: 1 }} onClick={() => onAdd(item)}>
                  Add to cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
