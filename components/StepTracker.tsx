import React from 'react';
import { Box, Typography, MobileStepper, Button, useTheme, IconButton } from '@mui/material';
import { Step } from '../types';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { COLORS } from '../constants';
import { useLanguage } from "./LanguageContext";

interface StepTrackerProps {
    currentStep: number;
    steps: Step[];
    onBack?: () => void;
    onHelp?: () => void;
}

const StepTracker: React.FC<StepTrackerProps> = ({ currentStep, steps, onBack, onHelp }) => {
    const theme = useTheme();
    const totalSteps = steps.length - 1; // Welcome step is not counted
    const { t } = useLanguage();

    return (
        <Box>
            <MobileStepper
                variant="progress"
                steps={totalSteps + 1}
                position="static"
                activeStep={currentStep}
                sx={{
                    maxWidth: '100%',
                    flexGrow: 1,
                    backgroundColor: 'transparent',
                    '.MuiMobileStepper-progress': {
                        width: '100%',
                        backgroundColor: `${COLORS.brown2}33`, // Brown with opacity
                    },
                }}
                backButton={
                    <Button
                        size="small"
                        onClick={onBack}
                        disabled={currentStep === 0}
                        sx={{
                            color: COLORS.brown2,
                        }}
                    >
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
                nextButton={
                    <IconButton
                        onClick={onHelp}
                        size="small"
                        aria-label="help"
                        sx={{
                            color: COLORS.brown2,
                        }}
                    >
                        <HelpOutlineIcon />
                    </IconButton>
                }
            />
            <Typography variant="body2" align="center" color="text.secondary" sx={{mt: -1}}>
                {t("dialogue.stepLabel", {current: currentStep, total: totalSteps})}: {steps[currentStep]?.title}
            </Typography>
        </Box>
    );
};

export default StepTracker;
