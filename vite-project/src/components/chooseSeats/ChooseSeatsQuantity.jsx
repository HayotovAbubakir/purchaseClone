import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { SpektrixIframeContent, SpektrixInput, SpektrixButton } from '../common/SpektrixForm';
import ChooseSeatsHeader from './ChooseSeatsHeader';
import { colors } from '../../theme/theme';
import { useApp } from '../../context/AppContext';

export default function ChooseSeatsQuantity({ event, instance, config, prevInstance, nextInstance }) {
  const navigate = useNavigate();
  const { addToBasket } = useApp();
  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(config.tiers.map((t) => [t.label, '0'])),
  );

  const totalQty = Object.values(quantities).reduce((sum, q) => sum + (parseInt(q, 10) || 0), 0);
  const totalPrice = config.tiers.reduce(
    (sum, tier) => sum + (parseInt(quantities[tier.label], 10) || 0) * tier.price,
    0,
  );

  const updateQty = (label, value) => {
    const num = Math.max(0, Math.min(config.maxTickets, parseInt(value, 10) || 0));
    setQuantities((prev) => ({ ...prev, [label]: String(num) }));
  };

  const handleContinue = () => {
    if (totalQty === 0) return;
    const tierSummary = config.tiers
      .filter((t) => (parseInt(quantities[t.label], 10) || 0) > 0)
      .map((t) => `${quantities[t.label]}x ${t.label}`)
      .join(', ');
    addToBasket({
      key: `${instance.id}-qty-${Date.now()}`,
      type: 'ticket',
      eventName: event.name,
      instanceLabel: `${instance.datetime} (${tierSummary})`,
      instanceId: instance.id,
      price: totalPrice,
      quantity: totalQty,
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

      <Box sx={{ bgcolor: '#e8e8e8', height: 8, mb: 2 }} />

      <Box sx={{ mb: 4 }}>
        {config.tiers.map((tier) => (
          <Box
            key={tier.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #ddd',
              borderRadius: '4px',
              px: 2,
              py: 1.5,
              mb: 1.5,
              bgcolor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <Typography sx={{ fontSize: '16px', fontWeight: 400, minWidth: 100, fontFamily: '"PT Sans", sans-serif' }}>
              {tier.label}:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SpektrixInput
                type="number"
                min={0}
                max={config.maxTickets}
                value={quantities[tier.label]}
                onChange={(e) => updateQty(tier.label, e.target.value)}
                sx={{ width: 56, textAlign: 'center', p: '6px 8px' }}
              />
              <Typography sx={{ fontSize: '16px', minWidth: 80, textAlign: 'right', fontFamily: '"PT Sans", sans-serif' }}>
                @ ${tier.price.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <SpektrixButton
        onClick={handleContinue}
        disabled={totalQty === 0}
        sx={{ px: 4, py: 1.25, bgcolor: colors.orange, color: colors.black }}
      >
        Continue
      </SpektrixButton>
    </SpektrixIframeContent>
  );
}
