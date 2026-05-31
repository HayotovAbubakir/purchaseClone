import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RegisterForm from './RegisterForm';

export default function RegisterModal({ open, onClose, onRegister }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0,
          maxWidth: 720,
          m: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1, pr: 1 }}>
        <IconButton onClick={onClose} aria-label="Close registration" size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 0, px: { xs: 2, md: 4 }, pb: 4 }}>
        <RegisterForm onSuccess={onRegister} onCancel={onClose} showCancel />
      </DialogContent>
    </Dialog>
  );
}
