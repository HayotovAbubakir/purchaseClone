import { Typography } from '@mui/material';
import PageContainer from '../components/common/PageContainer';

export default function StaticPage({ title, body }) {
  return (
    <PageContainer title={title}>
      <Typography>{body}</Typography>
    </PageContainer>
  );
}
