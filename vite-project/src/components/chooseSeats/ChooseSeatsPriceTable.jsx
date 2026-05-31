import { Box, Typography } from '@mui/material';

export default function ChooseSeatsPriceTable({ config }) {
  if (config.pricingStyle === 'pwyc') {
    return (
      <>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', mb: 1, fontFamily: '"PT Sans", sans-serif' }}>
          Prices
        </Typography>
        <Box
          component="table"
          sx={{
            borderCollapse: 'collapse',
            mb: 3,
            fontSize: '14px',
            fontFamily: '"PT Sans", sans-serif',
            '& th, & td': { border: '1px solid #ccc', p: '8px 12px', textAlign: 'center' },
            '& th': { fontWeight: 700, bgcolor: '#f5f5f5' },
          }}
        >
          <thead>
            <tr>
              <th />
              {config.tiers.map((t) => (
                <th key={t.label}>{t.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td sx={{ fontWeight: 700, textAlign: 'left !important' }}>ADMISSION</td>
              {config.tiers.map((t) => (
                <td key={t.label}>${t.price.toFixed(2)}</td>
              ))}
            </tr>
          </tbody>
        </Box>
      </>
    );
  }

  return (
    <>
      <Typography sx={{ fontWeight: 700, fontSize: '16px', mb: 1, fontFamily: '"PT Sans", sans-serif' }}>
        Prices
      </Typography>
      <Box
        component="table"
        sx={{
          borderCollapse: 'collapse',
          mb: 3,
          fontSize: '14px',
          fontFamily: '"PT Sans", sans-serif',
          '& td': { border: '1px solid #ccc', p: '8px 14px', verticalAlign: 'top' },
        }}
      >
        <tbody>
          <tr>
            <td />
            <td sx={{ fontWeight: 700 }}>REGULAR</td>
          </tr>
          {config.tiers.map((t) => (
            <tr key={t.label}>
              <td sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{t.label}</td>
              <td>
                ${t.price.toFixed(2)}
                {t.serviceCharge != null && ` (INC. $${t.serviceCharge.toFixed(2)} SERVICE CHARGE)`}
              </td>
            </tr>
          ))}
          <tr>
            <td sx={{ fontWeight: 700 }}>UNAVAILABLE</td>
            <td />
          </tr>
        </tbody>
      </Box>
    </>
  );
}
