import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';
import { SpektrixIframeContent, SpektrixPanel } from '../components/common/SpektrixForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useApp } from '../context/AppContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useApp();

  const handleRegister = (user) => {
    login(user);
    navigate('/MyAccount');
  };

  return (
    <PageContainer title="" maxWidth="xl">
      <SpektrixIframeContent>
        <SpektrixPanel>
          <RegisterForm
            onSuccess={handleRegister}
            onCancel={() => navigate('/LoginLogout')}
            showCancel
          />
        </SpektrixPanel>
      </SpektrixIframeContent>
    </PageContainer>
  );
}
