import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Link } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import {
  SpektrixIframeContent,
  SpektrixPageTitle,
  SpektrixGreyBox,
  SpektrixInput,
  SpektrixButton,
} from '../components/common/SpektrixForm';
import { colors } from '../theme/theme';
import { useApp, useDraft } from '../context/AppContext';

export default function BasketPage() {
  const navigate = useNavigate();
  const { basket, basketTotal, removeFromBasket } = useApp();
  const [promoCode, setPromoCode] = useDraft('promoCode', '');

  return (
    <PageContainer title="" maxWidth="xl">
      <SpektrixIframeContent>
        <SpektrixPageTitle>Cart</SpektrixPageTitle>

        <SpektrixGreyBox sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '16px', mb: 1 }}>Savings</Typography>
          <Typography sx={{ fontSize: '16px', mb: 2 }}>Enter a promotion code here if you have one</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'stretch', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <SpektrixInput
              sx={{ flex: 1, minWidth: 200 }}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <SpektrixButton sx={{ px: 3, whiteSpace: 'nowrap' }}>Apply code</SpektrixButton>
          </Box>
        </SpektrixGreyBox>

        {basket.length === 0 ? (
          <Typography sx={{ fontSize: '16px', mb: 3 }}>You have no items in your cart.</Typography>
        ) : (
          <Box sx={{ mb: 3 }}>
            <Box
              component="table"
              sx={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '16px',
                mb: 2,
                '& th, & td': { borderBottom: '1px solid #ddd', py: 1.5, textAlign: 'left' },
                '& th': { fontWeight: 700 },
              }}
            >
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Details</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {basket.map((item) => (
                  <tr key={item.key}>
                    <td>{item.eventName}</td>
                    <td>
                      {item.instanceLabel}
                      {item.seats && ` · Seats: ${item.seats.join(', ')}`}
                    </td>
                    <td style={{ textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Link
                        component="button"
                        onClick={() => removeFromBasket(item.key)}
                        sx={{ color: colors.text, cursor: 'pointer', fontSize: '16px', border: 'none', bgcolor: 'transparent' }}
                      >
                        Remove
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '16px', mb: 2, textAlign: 'right' }}>
              Total: ${basketTotal.toFixed(2)}
            </Typography>
            <SpektrixButton onClick={() => navigate('/Checkout')}>Checkout</SpektrixButton>
          </Box>
        )}

        <SpektrixGreyBox sx={{ height: 48, mt: 1 }} />
      </SpektrixIframeContent>
    </PageContainer>
  );
}
