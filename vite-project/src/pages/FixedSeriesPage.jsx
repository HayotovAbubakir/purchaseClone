import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Grid, Chip, Stack, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import PageContainer from '../components/common/PageContainer';
import { fixedSeries } from '../data/catalog';
import { useApp } from '../context/AppContext';

export default function FixedSeriesPage() {
  const navigate = useNavigate();
  const { addToBasket } = useApp();
  const [snackbar, setSnackbar] = useState(false);

  const handleAdd = (series) => {
    addToBasket({
      key: `series-${series.id}`,
      type: 'series',
      eventName: series.name,
      instanceLabel: series.description,
      price: series.price,
    });
    setSnackbar(true);
  };

  return (
    <PageContainer title="Fixed Series" subtitle="Subscribe to the full season and save">
      <Grid container spacing={3}>
        {fixedSeries.map((series, i) => (
          <Grid item xs={12} md={6} key={series.id}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              sx={{ p: 4 }}
            >
              <Typography variant="h5" gutterBottom>{series.name}</Typography>
              <Typography variant="h4" color="secondary" gutterBottom>${series.price}</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>{series.description}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                {series.shows.map((show) => (
                  <Chip key={show} label={show} size="small" />
                ))}
              </Stack>
              <Button variant="contained" onClick={() => handleAdd(series)}>Add to basket</Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button sx={{ mt: 3 }} onClick={() => navigate('/Events')}>Browse Individual Events</Button>
      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)} message="Series added to basket" />
    </PageContainer>
  );
}
