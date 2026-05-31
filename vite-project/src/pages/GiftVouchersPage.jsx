import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, FormControlLabel, Radio, RadioGroup, MenuItem, Select, Stack } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import {
  SpektrixIframeContent,
  SpektrixPageTitle,
  SpektrixFormRow,
  SpektrixInput,
  SpektrixButton,
} from '../components/common/SpektrixForm';
import { useApp, useDraft } from '../context/AppContext';

const defaultGiftForm = {
  value: '',
  day: '30',
  month: 'May',
  year: '2026',
  to: '',
  sendTo: 'my',
  recipientEmail: '',
  from: '',
  message: '',
};

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = [2026, 2027, 2028];

export default function GiftVouchersPage() {
  const navigate = useNavigate();
  const { addToBasket } = useApp();
  const [form, setForm] = useDraft('giftVouchers', defaultGiftForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(form.value);
    if (!amount || amount <= 0) return;
    addToBasket({
      key: `gv-${Date.now()}`,
      type: 'voucher',
      eventName: 'Gift Voucher',
      instanceLabel: `To: ${form.to}`,
      price: amount,
    });
    navigate('/Basket');
  };

  return (
    <PageContainer title="" maxWidth="xl">
      <SpektrixIframeContent>
        <SpektrixPageTitle>Gift Vouchers</SpektrixPageTitle>
        <Typography sx={{ mb: 3, fontSize: '16px' }}>
          Sign-in or create an account to redeem a gift
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900 }}>
          <SpektrixFormRow label="Value: $" required>
            <SpektrixInput value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
          </SpektrixFormRow>

          <SpektrixFormRow label="Date to send">
            <Stack direction="row" spacing={1}>
              <Select size="small" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} sx={{ minWidth: 80, borderRadius: 0 }}>
                {days.map((d) => <MenuItem key={d} value={String(d)}>{d}</MenuItem>)}
              </Select>
              <Select size="small" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} sx={{ minWidth: 120, borderRadius: 0 }}>
                {months.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </Select>
              <Select size="small" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} sx={{ minWidth: 90, borderRadius: 0 }}>
                {years.map((y) => <MenuItem key={y} value={String(y)}>{y}</MenuItem>)}
              </Select>
            </Stack>
          </SpektrixFormRow>
          <Typography sx={{ fontSize: '14px', color: '#666', mb: 2, ml: { sm: '25%' } }}>
            Gift vouchers do not expire
          </Typography>

          <SpektrixFormRow label="To" required>
            <SpektrixInput value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
          </SpektrixFormRow>

          <SpektrixFormRow label="Send to">
            <RadioGroup value={form.sendTo} onChange={(e) => setForm({ ...form, sendTo: e.target.value })}>
              <FormControlLabel value="my" control={<Radio size="small" />} label="My Email Address" />
              <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                <FormControlLabel value="recipient" control={<Radio size="small" />} label="Recipient's Email Address" />
                <SpektrixInput value={form.recipientEmail} onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })} sx={{ flex: 1, minWidth: 200 }} />
              </Stack>
            </RadioGroup>
          </SpektrixFormRow>

          <SpektrixFormRow label="From" required>
            <SpektrixInput value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
          </SpektrixFormRow>

          <SpektrixFormRow label="Message">
            <Box component="textarea" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              sx={{ width: '100%', minHeight: 100, border: '1px solid #999', p: 1, fontFamily: '"PT Sans", sans-serif', fontSize: '16px', borderRadius: 0 }} />
          </SpektrixFormRow>

          <Typography sx={{ fontSize: '14px', color: '#666', mb: 3 }}>
            You will have the option to add another gift voucher on the &apos;Cart&apos; screen.
          </Typography>

          <SpektrixButton type="submit">Add to cart</SpektrixButton>
        </Box>
      </SpektrixIframeContent>
    </PageContainer>
  );
}
