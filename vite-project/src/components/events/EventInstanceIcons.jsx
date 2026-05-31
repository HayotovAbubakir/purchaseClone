import { Box } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ClosedCaptionOutlinedIcon from '@mui/icons-material/ClosedCaptionOutlined';
import HearingDisabledOutlinedIcon from '@mui/icons-material/HearingDisabledOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';

const iconMap = {
  Preview: VisibilityOutlinedIcon,
  Matinee: WbSunnyOutlinedIcon,
  'Pay what you can': PaidOutlinedIcon,
  'Open Captioned Performance': ClosedCaptionOutlinedIcon,
  'Audio Description': HearingDisabledOutlinedIcon,
  Filmed: VideocamOutlinedIcon,
};

function resolveIcon(label) {
  if (iconMap[label]) return iconMap[label];
  if (/filmed/i.test(label)) return VideocamOutlinedIcon;
  if (/mask/i.test(label)) return MasksOutlinedIcon;
  if (/caption/i.test(label)) return ClosedCaptionOutlinedIcon;
  if (/audio description/i.test(label)) return HearingDisabledOutlinedIcon;
  return null;
}

export default function EventInstanceIcons({ icons = [] }) {
  if (!icons.length) return null;

  return (
    <Box className="custom-event-icons" sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 0.5 }}>
      {icons.map((label) => {
        const Icon = resolveIcon(label);
        if (!Icon) return null;
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', color: 'rgba(0,0,0,0.87)' }}>
            <Icon sx={{ fontSize: 24 }} aria-label={label} />
          </Box>
        );
      })}
    </Box>
  );
}
