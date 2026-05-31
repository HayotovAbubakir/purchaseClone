import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { formatCalendarDate, formatInstanceTitle } from '../../data/chooseSeatsConfig';
import { SpektrixPageTitle } from '../common/SpektrixForm';

export default function ChooseSeatsHeader({ event, instance, prevInstance, nextInstance }) {
  return (
    <>
      <SpektrixPageTitle>Choose Seats</SpektrixPageTitle>

      <Typography sx={{ fontWeight: 700, fontSize: '16px', mb: 0.5, fontFamily: '"PT Sans", sans-serif' }}>
        {formatInstanceTitle(event, instance)}
      </Typography>
      <Typography sx={{ fontSize: '16px', mb: 2.5, fontFamily: '"PT Sans", sans-serif' }}>
        {event.chooseSeatsVenueLine || event.venue + ', ' + event.address?.split(',')[0]}
      </Typography>

      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '20px',
          px: 1,
          py: 0.5,
          mb: 3,
          gap: 0.5,
        }}
      >
        {prevInstance ? (
          <Link
            component={RouterLink}
            to={`/ChooseSeats/${prevInstance.id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              px: 0.5,
            }}
            aria-label="Previous Performance"
          >
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </Link>
        ) : (
          <Box sx={{ width: 28 }} />
        )}

        <Typography sx={{ fontSize: '14px', px: 1, whiteSpace: 'nowrap', fontFamily: '"PT Sans", sans-serif' }}>
          {formatCalendarDate(instance)}
        </Typography>

        {nextInstance ? (
          <Link
            component={RouterLink}
            to={`/ChooseSeats/${nextInstance.id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              px: 0.5,
            }}
            aria-label="Next Performance"
          >
            <ChevronRightIcon sx={{ fontSize: 20 }} />
          </Link>
        ) : (
          <Box sx={{ width: 28 }} />
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid #ccc', pl: 0.5, ml: 0.5 }}>
          <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: '#666' }} />
          <KeyboardArrowDownIcon sx={{ fontSize: 18, color: '#666' }} />
        </Box>
      </Box>
    </>
  );
}
