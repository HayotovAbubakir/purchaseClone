import { Container } from '@mui/material';
import { SpektrixPageTitle } from './SpektrixForm';

export default function PageContainer({ title, children, maxWidth = 'xl' }) {
  return (
    <Container maxWidth={maxWidth} sx={{ px: { xs: 2, md: 3 } }}>
      {title && <SpektrixPageTitle>{title}</SpektrixPageTitle>}
      {children}
    </Container>
  );
}
