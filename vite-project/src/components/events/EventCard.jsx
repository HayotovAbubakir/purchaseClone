import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, Box, Link } from '@mui/material';
import { colors } from '../../theme/theme';

export default function EventCard({ event }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="EventItem"
      elevation={1}
      sx={{
        width: '100%',
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        boxShadow: '0 2px 1px 0 rgba(0,0,0,0.2), 0 3px 25px 0 rgba(0,0,0,0.12), 0 2px 6px 0 rgba(0,0,0,0.05)',
      }}
    >
      <Box
        sx={{
          height: 194,
          backgroundImage: `url(${event.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="img"
        title={`${event.name} image`}
      />

      <CardActions
        sx={{
          justifyContent: 'flex-end',
          px: 0,
          py: 0,
          mt: -6,
          minHeight: 48,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Button
          component={RouterLink}
          to={`/EventAvailability?EventId=${event.id}&ref=bookNow&scroll=timeAndDates`}
          className="custom-button"
          sx={{
            bgcolor: colors.orange,
            color: colors.black,
            fontWeight: 500,
            fontSize: '16px',
            px: '14px',
            py: '12px',
            borderRadius: 0,
            textTransform: 'uppercase',
            boxShadow: 'none',
            '&:hover': { bgcolor: colors.orangeDark, boxShadow: 'none' },
          }}
        >
          Book Now
        </Button>
      </CardActions>

      <CardContent sx={{ pt: 1, px: 2, pb: 2 }}>
        <Typography component="h2" sx={{ fontWeight: 700, fontSize: '16px', mb: 0.5, textTransform: 'uppercase' }}>
          {event.name}
        </Typography>
        <Typography sx={{ fontSize: '16px', mb: 1, textTransform: 'capitalize' }}>
          {event.dateRange}
        </Typography>
        <Typography sx={{ fontSize: '16px', lineHeight: 1.5 }}>
          {expanded ? event.htmlDescription.replace(/<[^>]+>/g, '') : event.teaser}
          {!expanded && (
            <>
              {' '}
              <Link
                component="button"
                onClick={() => setExpanded(true)}
                sx={{ color: colors.text, textDecoration: 'none', font: 'inherit', border: 'none', background: 'none', cursor: 'pointer', p: 0 }}
              >
                Read more
              </Link>
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
