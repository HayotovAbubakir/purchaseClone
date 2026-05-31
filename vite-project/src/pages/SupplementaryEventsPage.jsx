import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, Card, Alert, Stack } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import { supplementaryEvents } from '../data/catalog';
import { useApp } from '../context/AppContext';

export default function SupplementaryEventsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToBasket } = useApp();
  const event = supplementaryEvents.find((s) => s.id === id);

  if (!event) {
    return (
      <PageContainer title="Supplementary Event">
        <Alert severity="error">There is no event</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/Events')}>Back to Events</Button>
      </PageContainer>
    );
  }

  const handleAdd = () => {
    addToBasket({
      key: `supp-${event.id}`,
      type: 'supplementary',
      eventName: event.name,
      instanceLabel: `${event.date} · ${event.time}`,
      price: event.price,
    });
    navigate('/Basket');
  };

  return (
    <PageContainer title={event.name} maxWidth="md">
      <Card sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {event.date} · {event.time}
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>{event.description}</Typography>
        <Typography variant="h6">
          {event.price === 0 ? 'Free with ticket purchase' : `$${event.price.toFixed(2)}`}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="contained" onClick={handleAdd}>
            {event.price === 0 ? 'Reserve Spot' : 'Add to basket'}
          </Button>
          <Button onClick={() => navigate(`/EventAvailability?EventId=${event.parentEventId}`)}>Back to Event</Button>
        </Stack>
      </Card>
    </PageContainer>
  );
}
