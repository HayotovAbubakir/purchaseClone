import { Box, Typography } from '@mui/material';
import { SpektrixButton } from '../common/SpektrixForm';
import { colors } from '../../theme/theme';

const cardShadow =
  'rgba(0, 0, 0, 0.2) 0px 2px 1px 0px, rgba(0, 0, 0, 0.12) 0px 3px 15px 0px, rgba(0, 0, 0, 0.05) 0px 2px 6px 0px';

export default function MembershipCard({ item, onAdd }) {
  return (
    <Box
      className="Membership"
      sx={{
        display: 'inline-block',
        verticalAlign: 'top',
        width: 420,
        minHeight: 443,
        boxSizing: 'border-box',
        bgcolor: '#fff',
        p: '20px',
        m: 0,
        boxShadow: cardShadow,
        border: 'none',
        fontFamily: '"PT Sans", sans-serif',
        fontSize: '16px',
        color: colors.text,
        textAlign: 'left',
      }}
    >
      <Box className="WikiText" sx={{ minHeight: 200 }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: '35px',
            lineHeight: 1.15,
            letterSpacing: '-0.55px',
            m: '0 0 20px',
            fontFamily: '"PT Sans", sans-serif',
          }}
        >
          {item.name}
        </Typography>
        <Typography
          component="p"
          sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.5,
            m: 0,
            fontFamily: '"PT Sans", sans-serif',
          }}
        >
          {item.description}
        </Typography>
      </Box>

      <Box className="Details" sx={{ mt: '30px', fontWeight: 700 }}>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: '16px 0',
            p: 0,
          }}
        >
          <Box component="li" className="Period" sx={{ display: 'list-item', mb: 0 }}>
            <Typography component="span" sx={{ fontWeight: 700, fontSize: '16px' }}>
              Membership Period: 1 month
            </Typography>
          </Box>
          <Box component="li" className="Price" sx={{ display: 'list-item', mb: 0 }}>
            <Typography component="span" sx={{ fontWeight: 700, fontSize: '16px' }}>
              Price:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 700, fontSize: '16px' }}>
              ${item.price.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box component="p" className="AutoRenew" sx={{ m: 0, pb: '12px', display: 'flex', alignItems: 'center' }}>
          <Box
            component="input"
            type="checkbox"
            defaultChecked
            sx={{
              width: 22,
              height: 22,
              m: 0,
              p: 0,
              flexShrink: 0,
              accentColor: colors.black,
            }}
          />
          <Typography
            component="label"
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: 1.25,
              ml: '10px',
              fontFamily: '"PT Sans", sans-serif',
            }}
          >
            Automatically Renew?
          </Typography>
        </Box>

        <Box component="p" className="Buttons" sx={{ m: 0, p: 0 }}>
          <SpektrixButton
            onClick={() => onAdd(item)}
            sx={{
              width: 'auto',
              minWidth: 123,
              height: 46,
              px: '14px',
              py: '12px',
              mt: '10px',
              mb: 0,
              fontWeight: 400,
              textTransform: 'none',
            }}
          >
            Add to cart
          </SpektrixButton>
        </Box>
      </Box>
    </Box>
  );
}
