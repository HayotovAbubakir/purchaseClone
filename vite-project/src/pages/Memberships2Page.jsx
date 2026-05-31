import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Button,
  Typography,
  Box,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PageContainer from '../components/common/PageContainer';
import { memberships } from '../data/catalog';

const features = [
  'Priority booking',
  'Ticket vouchers',
  '15% off additional tickets',
  'Unlimited exchanges',
  'Patron events',
  'Backstage tour',
];

const featureMap = {
  memberscriber: ['Priority booking', 'Ticket vouchers', '15% off additional tickets', 'Unlimited exchanges'],
  patron: ['Priority booking', 'Ticket vouchers', '15% off additional tickets', 'Unlimited exchanges', 'Patron events'],
  benefactor: features,
};

export default function Memberships2Page() {
  const navigate = useNavigate();

  return (
    <PageContainer title="Membership Comparison">
      <Card sx={{ overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              {memberships.map((m) => (
                <TableCell key={m.id} align="center">{m.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature}>
                <TableCell>{feature}</TableCell>
                {memberships.map((m) => (
                  <TableCell key={m.id} align="center">
                    {featureMap[m.id]?.includes(feature) ? <CheckIcon color="secondary" /> : '—'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell><strong>Price</strong></TableCell>
              {memberships.map((m) => (
                <TableCell key={m.id} align="center"><strong>${m.price}</strong></TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => navigate('/Memberships')}>Choose Membership</Button>
        <Button sx={{ ml: 2 }} onClick={() => navigate('/Events')}>Back to Events</Button>
      </Box>
    </PageContainer>
  );
}
