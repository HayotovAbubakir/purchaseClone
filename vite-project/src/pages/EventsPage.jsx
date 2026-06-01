import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { SpektrixPageTitle } from '../components/common/SpektrixForm';
import EventCard from '../components/events/EventCard';
import TicketModal from '../components/events/TicketModal';
import { events } from '../data/events';

/** Matches original site spacing between event cards (~103px measured). */
const EVENTS_CARD_GAP = 103;

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 0 } }}>
      <Box sx={{ pl: { xs: 0, md: `${EVENTS_CARD_GAP}px` } }}>
        <SpektrixPageTitle sx={{ mt: '24px' }}>EVENTS</SpektrixPageTitle>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: { xs: 'center', md: 'flex-start' },
            columnGap: { xs: 3, md: `${EVENTS_CARD_GAP}px` },
            rowGap: { xs: 3, md: 0 },
          }}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} onBookNow={setSelectedEvent} />
          ))}
        </Box>
      </Box>

      <TicketModal
        event={selectedEvent}
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </Container>
  );
}
