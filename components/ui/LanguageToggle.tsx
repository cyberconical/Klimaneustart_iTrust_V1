import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useLanguage } from '../LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: 'de' | 'en' | null,
  ) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  return (
    <Box
      sx={{
        top: 16,
        right: 16,
        zIndex: 1100,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        padding: 1,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <ToggleButtonGroup
        value={language}
        exclusive
        onChange={handleLanguageChange}
        aria-label="language selection"
        size="small"
      >
        <ToggleButton value="de" aria-label="German">
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            DE
          </Typography>
        </ToggleButton>
        <ToggleButton value="en" aria-label="English">
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            EN
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageToggle;