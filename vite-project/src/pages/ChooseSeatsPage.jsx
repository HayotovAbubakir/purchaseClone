import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Container } from '@mui/material';
import { getInstanceById } from '../data/events';
import { getChooseSeatsConfig } from '../data/chooseSeatsConfig';
import ChooseSeatsQuantity from '../components/chooseSeats/ChooseSeatsQuantity';
import ChooseSeatsReserved from '../components/chooseSeats/ChooseSeatsReserved';

export default function ChooseSeatsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = getInstanceById(id);

  if (!data) {
    return (
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        <Alert severity="error">There is no event id</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/Events')}>Back to Events</Button>
      </Container>
    );
  }

  const { event, instance } = data;
  const config = getChooseSeatsConfig(event.id, instance.id);
  const instanceIndex = event.instances.findIndex((i) => i.id === instance.id);
  const prevInstance = instanceIndex > 0 ? event.instances[instanceIndex - 1] : null;
  const nextInstance = instanceIndex < event.instances.length - 1 ? event.instances[instanceIndex + 1] : null;

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, pb: 4 }}>
      {config.mode === 'quantity' ? (
        <ChooseSeatsQuantity
          event={event}
          instance={instance}
          config={config}
          prevInstance={prevInstance}
          nextInstance={nextInstance}
        />
      ) : (
        <ChooseSeatsReserved
          event={event}
          instance={instance}
          config={config}
          prevInstance={prevInstance}
          nextInstance={nextInstance}
        />
      )}
    </Container>
  );
}
