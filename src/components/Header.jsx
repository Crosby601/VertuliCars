import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Header = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                py: 5,
                background: 'linear-gradient(135deg, #1A1128 0%, #2D1B69 50%, #1A1128 100%)',
                borderBottom: '2px solid rgba(124, 58, 237, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)',
                },
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <DirectionsCarIcon
                        sx={{ fontSize: 48, color: 'primary.light' }}
                    />
                    <Typography
                        variant="h3"
                        sx={{
                            background: 'linear-gradient(135deg, #C4B5FD 0%, #7C3AED 50%, #A78BFA 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: { xs: '2rem', md: '3rem' },
                        }}
                    >
                        VERTULI
                    </Typography>
                </Box>
                <Typography
                    variant="h6"
                    sx={{ color: 'secondary.main', fontWeight: 400, mb: 2 }}
                >
                    Znajdź swój wymarzony samochód
                </Typography>
                <Chip
                    label="Premium Auto Selection"
                    sx={{
                        background: 'rgba(124, 58, 237, 0.2)',
                        border: '1px solid rgba(124, 58, 237, 0.4)',
                        color: 'secondary.light',
                        fontWeight: 600,
                        px: 1,
                    }}
                />
            </Box>
        </Box>
    );
};

export default Header;