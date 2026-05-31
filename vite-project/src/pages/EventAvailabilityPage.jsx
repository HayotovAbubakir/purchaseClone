import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, Alert, Button, Container } from '@mui/material';
import EventAvailabilityItem from '../components/events/EventAvailabilityItem';
import { getEventById } from '../data/events';

export default function EventAvailabilityPage() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('EventId');
  const datesRef = useRef(null);
  const event = getEventById(eventId);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('scroll') === 'timeAndDates' && datesRef.current) {
      setTimeout(() => datesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [eventId, searchParams]);

  if (!event) {
    return (
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        <Alert severity="error">No event was found with the provided id</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/Events')}>Back to Events</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
      <Typography
        component="h1"
        className="custom-title"
        sx={{
          fontWeight: 700,
          fontSize: '35px',
          letterSpacing: '-0.55px',
          mt: '32px',
          mb: 0,
          fontFamily: '"PT Sans", sans-serif',
        }}
      >
        {event.name}
      </Typography>

      <Box ref={datesRef} id="timeAndDates" sx={{ mt: 0 }}>
        {event.instances.map((instance) => (
          <EventAvailabilityItem key={instance.id} instance={instance} />
        ))}
      </Box>
    </Container>
  );
}
