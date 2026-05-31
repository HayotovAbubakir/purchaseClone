import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { SpektrixIframeContent, SpektrixButton } from '../common/SpektrixForm';
import ChooseSeatsHeader from './ChooseSeatsHeader';
import ChooseSeatsPriceTable from './ChooseSeatsPriceTable';
import TheatreSeatMap from './TheatreSeatMap';
import { colors } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import { getSeatingPlan } from '../../data/seatingPlans';

export default function ChooseSeatsReserved({ event, instance, config, prevInstance, nextInstance }) {
  const navigate = useNavigate();
  const { addToBasket } = useApp();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const plan = getSeatingPlan(config.seatingPlanId);

  const handleToggleSeat = (seat, isSelected) => {
    setSelectedSeats((prev) =>
      isSelected ? prev.filter((s) => s.id !== seat.id) : [...prev, seat],
    );
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + (s.price || 0), 0);

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    addToBasket({
      key: `${instance.id}-${selectedSeats.map((s) => s.id).join('-')}`,
      type: 'ticket',
      eventName: event.name,
      instanceLabel: instance.datetime,
      instanceId: instance.id,
      seats: selectedSeats.map((s) => s.id),
      price: totalPrice,
    });
    navigate('/Basket');
  };

  return (
    <SpektrixIframeContent>
      <ChooseSeatsHeader
        event={{ ...event, chooseSeatsVenueLine: config.venueLine }}
        instance={instance}
        prevInstance={prevInstance}
        nextInstance={nextInstance}
      />

      <Typography sx={{ fontWeight: 700, fontSize: '16px', mb: 2, fontFamily: '"PT Sans", sans-serif' }}>
        {config.instructions}
      </Typography>

      <ChooseSeatsPriceTable config={config} />

      {plan && (
        <TheatreSeatMap
          plan={plan}
          selectedSeats={selectedSeats}
          onToggleSeat={handleToggleSeat}
          maxTickets={config.maxTickets}
        />
      )}

      {selectedSeats.length > 0 && (
        <Typography sx={{ mb: 2, fontSize: '16px', fontFamily: '"PT Sans", sans-serif' }}>
          Selected: {selectedSeats.map((s) => s.id).join(', ')} · Total: ${totalPrice.toFixed(2)}
        </Typography>
      )}

      <SpektrixButton
        onClick={handleContinue}
        disabled={selectedSeats.length === 0}
        sx={{ px: 4, py: 1.25, bgcolor: colors.orange, color: colors.black }}
      >
        Continue
      </SpektrixButton>
    </SpektrixIframeContent>
  );
}
