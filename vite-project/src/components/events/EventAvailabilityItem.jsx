import { Link as RouterLink } from 'react-router-dom';
import { Card, Box, Typography, Button } from '@mui/material';
import EventInstanceIcons from './EventInstanceIcons';
import { colors } from '../../theme/theme';

export default function EventAvailabilityItem({ instance }) {
  const buttonLabel = instance.button || (instance.status === 'limited' ? 'Limited Availability' : 'Book Now');

  return (
    <Card
      className="EventItem"
      elevation={1}
      sx={{
        mb: '12px',
        borderRadius: '4px',
        boxShadow: '0 2px 1px 0 rgba(0,0,0,0.2), 0 3px 25px 0 rgba(0,0,0,0.12), 0 2px 6px 0 rgba(0,0,0,0.05)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ py: '14px', px: '24px', flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Box>
              <Typography
                component="h2"
                className="event-item-title"
                sx={{
                  fontWeight: 700,
                  fontSize: '18.56px',
                  textTransform: 'capitalize',
                  fontFamily: '"PT Sans", sans-serif',
                  lineHeight: 1.2,
                }}
              >
                {instance.day}
              </Typography>
              <Typography
                className="custom-body-text"
                sx={{
                  fontSize: '16px',
                  textTransform: 'capitalize',
                  fontFamily: '"PT Sans", sans-serif',
                  lineHeight: 1.5,
                }}
              >
                {instance.datetime}
              </Typography>
            </Box>
            <EventInstanceIcons icons={instance.icons} />
          </Box>
          {instance.note && (
            <Typography
              className="custom-body-text"
              sx={{ fontSize: '16px', fontFamily: '"PT Sans", sans-serif', mt: 0.5, lineHeight: 1.5 }}
            >
              {instance.note}
            </Typography>
          )}
        </Box>

        <Box className="custom-event-footer" sx={{ py: '14px', px: '24px', display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
          <Button
            component={RouterLink}
            to={`/ChooseSeats/${instance.id}`}
            className="custom-button"
            sx={{
              bgcolor: colors.orange,
              color: colors.black,
              fontWeight: 500,
              fontSize: '16px',
              px: '14px',
              py: '12px',
              borderRadius: 0,
              textTransform: 'none',
              boxShadow: 'none',
              minWidth: 64,
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: colors.orangeDark, boxShadow: 'none' },
            }}
          >
            {buttonLabel}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
