import { Grid } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import EventCard from '../components/events/EventCard';
import { events } from '../data/events';

export default function EventsPage() {
  return (
    <PageContainer title="EVENTS">
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
