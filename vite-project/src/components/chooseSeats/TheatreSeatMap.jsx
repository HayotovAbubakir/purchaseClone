import { Box } from '@mui/material';

export default function TheatreSeatMap({ plan, selectedSeats, onToggleSeat, maxTickets }) {
  if (!plan) return null;

  const handleToggle = (seat) => {
    if (!seat.selectable) return;
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (!isSelected && selectedSeats.length >= maxTickets) return;
    onToggleSeat(seat, isSelected);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: plan.width,
        mx: 'auto',
        height: plan.height,
        overflow: 'hidden',
        mb: 3,
        bgcolor: '#fff',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: plan.width,
          height: plan.height,
          transform: 'translate(116px, 0)',
          transformOrigin: '0 0',
        }}
      >
        <Box
          component="img"
          src={plan.background}
          alt="Theatre seating plan"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        {plan.seats.map((seat) => {
          const isSelected = selectedSeats.some((s) => s.id === seat.id);
          return (
            <Box
              key={`${seat.id}-${seat.top}-${seat.left}`}
              component={seat.selectable ? 'button' : 'span'}
              type={seat.selectable ? 'button' : undefined}
              onClick={() => handleToggle(seat)}
              title={seat.label}
              aria-label={seat.label}
              sx={{
                position: 'absolute',
                top: seat.top,
                left: seat.left,
                width: seat.width,
                height: seat.height,
                border: 'none',
                borderRadius: '50%',
                p: 0,
                m: 0,
                minWidth: 0,
                background: seat.bg,
                boxShadow: isSelected ? '0 0 0 2px #000, 0 0 0 4px #fff' : 'none',
                cursor: seat.selectable ? 'pointer' : 'default',
                opacity: seat.selectable ? 1 : 0.85,
                '&:hover': seat.selectable ? { filter: 'brightness(0.92)' } : undefined,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
