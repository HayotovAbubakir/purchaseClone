import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import { SpektrixIframeContent, SpektrixPageTitle } from '../components/common/SpektrixForm';
import MembershipCard from '../components/memberships/MembershipCard';
import { monthlyDonations } from '../data/catalog';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/theme';

export default function MembershipsPage() {
  const { addToBasket } = useApp();
  const [, setAdded] = useState(false);

  const handleAdd = (item) => {
    addToBasket({
      key: `membership-${item.id}-${Date.now()}`,
      type: 'membership',
      eventName: item.name,
      instanceLabel: 'Membership Period: 1 month',
      price: item.price,
    });
    setAdded(true);
  };

  return (
    <PageContainer title="" maxWidth="xl">
      <SpektrixIframeContent
        className="SpektrixPage Memberships"
        sx={{ maxWidth: 1312, mx: 'auto', width: '100%' }}
      >
        <SpektrixPageTitle>Monthly Donations</SpektrixPageTitle>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '16px',
            mb: 2,
            fontFamily: '"PT Sans", sans-serif',
          }}
        >
          Join the Lookingglass journey by making a bigger impact through recurring gifts!
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            mb: 4,
            lineHeight: 1.5,
            fontFamily: '"PT Sans", sans-serif',
          }}
        >
          The &quot;Automatically Renew&quot; check box sets up an indefinite recurring gift in the amount selected,
          and unclicking that check box will process a one-time gift. You may adjust your recurring gift at any time,
          or set up a recurring donation for another amount by getting in touch at 773-477-9257 or{' '}
          <Box
            component="a"
            href="mailto:development@lookingglasstheatre.org"
            sx={{ color: colors.text, textDecoration: 'none' }}
          >
            development@lookingglasstheatre.org
          </Box>
          .
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            columnGap: '14px',
            rowGap: '20px',
          }}
        >
          {monthlyDonations.map((item) => (
            <MembershipCard key={item.id} item={item} onAdd={handleAdd} />
          ))}
        </Box>
      </SpektrixIframeContent>
    </PageContainer>
  );
}
