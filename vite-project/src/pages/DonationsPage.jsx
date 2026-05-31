import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, MenuItem, Select } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import {
  SpektrixIframeContent,
  SpektrixCard,
  SpektrixButton,
  SpektrixInput,
  SpektrixCheckbox,
} from '../components/common/SpektrixForm';
import { donationFunds } from '../data/catalog';
import { useApp, useDraft } from '../context/AppContext';

const initialFormState = () =>
  Object.fromEntries(
    donationFunds.map((f) => [
      f.id,
      {
        amount: f.defaultAmount.toFixed(2),
        recognitionName: '',
        anonymous: false,
        recognitionSomeoneElse: false,
        honorType: 'in_honor_of',
        honoreeName: '',
      },
    ]),
  );

function DonationCard({ fund, form, onChange }) {
  const update = (field, value) => onChange(fund.id, field, value);

  return (
    <SpektrixCard>
      <Typography sx={{ fontWeight: 700, fontSize: '16px', mb: 2 }}>{fund.name}</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: 1.6, mb: 3, flexGrow: 1 }}>{fund.description}</Typography>

      <Typography sx={{ fontSize: '16px', mb: 0.5 }}>Amount:</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #999', maxWidth: 120, mb: 2 }}>
        <Typography sx={{ px: 1, fontSize: '16px', color: '#666' }}>$</Typography>
        <SpektrixInput
          type="text"
          value={form.amount}
          onChange={(e) => update('amount', e.target.value)}
          sx={{ border: 'none', flex: 1, minWidth: 0 }}
        />
      </Box>

      <Typography sx={{ fontSize: '16px', mb: 0.5 }}>
        Recognition Name (this is how you will appear in donor lists):
      </Typography>
      <SpektrixInput
        type="text"
        value={form.recognitionName}
        onChange={(e) => update('recognitionName', e.target.value)}
        sx={{ mb: 2 }}
      />

      <SpektrixCheckbox
        label="I would like this donation to be anonymous."
        checked={form.anonymous}
        onChange={(e) => update('anonymous', e.target.checked)}
      />

      <SpektrixCheckbox
        label="I would like to make this donation in recognition of someone else."
        checked={form.recognitionSomeoneElse}
        onChange={(e) => update('recognitionSomeoneElse', e.target.checked)}
      />

      {form.recognitionSomeoneElse && (
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Select
            size="small"
            value={form.honorType}
            onChange={(e) => update('honorType', e.target.value)}
            sx={{ minWidth: 140, borderRadius: 0, fontSize: '16px' }}
          >
            <MenuItem value="in_honor_of">in_honor_of</MenuItem>
            <MenuItem value="in_memory_of">in_memory_of</MenuItem>
          </Select>
          <SpektrixInput
            type="text"
            value={form.honoreeName}
            onChange={(e) => update('honoreeName', e.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>
      )}
    </SpektrixCard>
  );
}

export default function DonationsPage() {
  const navigate = useNavigate();
  const { addToBasket } = useApp();
  const [forms, setForms] = useDraft('donations', initialFormState());

  const handleChange = (fundId, field, value) => {
    setForms((prev) => ({
      ...prev,
      [fundId]: { ...prev[fundId], [field]: value },
    }));
  };

  const handleAddToCart = () => {
    donationFunds.forEach((fund) => {
      const form = forms[fund.id];
      const amount = parseFloat(form.amount);
      if (!amount || amount <= 0) return;
      addToBasket({
        key: `donation-${fund.id}-${Date.now()}`,
        type: 'donation',
        eventName: fund.name,
        instanceLabel: form.anonymous ? 'Anonymous donation' : form.recognitionName || 'Donation',
        price: amount,
      });
    });
    navigate('/Basket');
  };

  return (
    <PageContainer title="" maxWidth="xl">
      <SpektrixIframeContent>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {donationFunds.map((fund) => (
            <Grid item xs={12} md={4} key={fund.id}>
              <DonationCard fund={fund} form={forms[fund.id]} onChange={handleChange} />
            </Grid>
          ))}
        </Grid>
        <SpektrixButton onClick={handleAddToCart}>Add to cart</SpektrixButton>
      </SpektrixIframeContent>
    </PageContainer>
  );
}
