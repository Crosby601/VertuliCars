import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Divider,
    Skeleton,
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { formatPrice } from '../utils/filters';

const getFuelChipColor = (fuelType) => {
    const colorMap = {
        Benzyna: {
            bg: 'rgba(251, 191, 36, 0.15)',
            color: '#FBBF24',
            border: 'rgba(251, 191, 36, 0.4)',
        },
        Diesel: {
            bg: 'rgba(156, 163, 175, 0.15)',
            color: '#9CA3AF',
            border: 'rgba(156, 163, 175, 0.4)',
        },
        Elektryk: {
            bg: 'rgba(52, 211, 153, 0.15)',
            color: '#34D399',
            border: 'rgba(52, 211, 153, 0.4)',
        },
        Hybryda: {
            bg: 'rgba(96, 165, 250, 0.15)',
            color: '#60A5FA',
            border: 'rgba(96, 165, 250, 0.4)',
        },
    };
    return colorMap[fuelType] || colorMap.Benzyna;
};

const getFuelIcon = (fuelType) => {
    const iconMap = {
        Benzyna: '⛽',
        Diesel: '🛢️',
        Elektryk: '⚡',
        Hybryda: '🔋',
    };
    return iconMap[fuelType] || '⛽';
};

const CarCard = ({ car }) => {
    const fuelStyle = getFuelChipColor(car.fuelType);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background:
                    'linear-gradient(165deg, #1A1128 0%, #1E1433 50%, #221738 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Badge dostępności */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 2,
                }}
            >
                {car.isAvailable ? (
                    <Chip
                        icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                        label="Dostępny"
                        size="small"
                        sx={{
                            background: 'rgba(52, 211, 153, 0.85)',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            backdropFilter: 'blur(4px)',
                        }}
                    />
                ) : (
                    <Chip
                        icon={<CancelIcon sx={{ fontSize: 16 }} />}
                        label="Na zamówienie"
                        size="small"
                        sx={{
                            background: 'rgba(248, 113, 113, 0.85)',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            backdropFilter: 'blur(4px)',
                        }}
                    />
                )}
            </Box>

            {/* Zdjęcie samochodu */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 200,
                    overflow: 'hidden',
                    background:
                        'linear-gradient(135deg, #1A1128 0%, #2D1B69 100%)',
                }}
            >
                {/* Skeleton ładowania */}
                {!imageLoaded && !imageError && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bgcolor: 'rgba(124, 58, 237, 0.1)',
                        }}
                    />
                )}

                {/* Fallback gdy zdjęcie się nie załaduje */}
                {imageError ? (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background:
                                'linear-gradient(135deg, #1A1128 0%, #2D1B69 100%)',
                        }}
                    >
                        <DirectionsCarIcon
                            sx={{
                                fontSize: 64,
                                color: 'rgba(124, 58, 237, 0.3)',
                                mb: 1,
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary', opacity: 0.5 }}
                        >
                            Brak zdjęcia
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        component="img"
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: imageLoaded ? 1 : 0,
                            transition: 'opacity 0.4s ease-in-out',
                        }}
                    />
                )}

                {/* Gradient na dole zdjęcia #klimacik */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background:
                            'linear-gradient(to top, #1E1433 0%, transparent 100%)',
                        pointerEvents: 'none',
                    }}
                />
            </Box>

            {/* Treść karty */}
            <CardContent sx={{ flexGrow: 1, p: 2.5, pt: 2 }}>
                {/* Marka */}
                <Typography
                    variant="overline"
                    sx={{
                        color: 'primary.light',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        fontSize: '0.7rem',
                    }}
                >
                    {car.brand}
                </Typography>

                {/* Model */}
                <Typography
                    variant="h6"
                    sx={{
                        color: 'text.primary',
                        fontWeight: 700,
                        mb: 1.5,
                        lineHeight: 1.2,
                        minHeight: '2.4em',
                    }}
                >
                    {car.model}
                </Typography>

                {/* Typ|chip paliwa */}
                <Chip
                    label={`${getFuelIcon(car.fuelType)} ${car.fuelType}`}
                    size="small"
                    sx={{
                        background: fuelStyle.bg,
                        color: fuelStyle.color,
                        border: `1px solid ${fuelStyle.border}`,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        mb: 2,
                    }}
                />

                <Divider
                    sx={{
                        borderColor: 'rgba(124, 58, 237, 0.15)',
                        my: 1.5,
                    }}
                />

                {/* Parametry */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {/* Moc */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                            <SpeedIcon
                                sx={{ fontSize: 18, color: 'primary.light' }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary' }}
                            >
                                Moc
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.primary', fontWeight: 700 }}
                        >
                            {car.horsepower} KM
                        </Typography>
                    </Box>

                    {/* Rocznik */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                            <CalendarTodayIcon
                                sx={{ fontSize: 18, color: 'primary.light' }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary' }}
                            >
                                Rocznik
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.primary', fontWeight: 700 }}
                        >
                            {car.year}
                        </Typography>
                    </Box>
                </Box>

                <Divider
                    sx={{
                        borderColor: 'rgba(124, 58, 237, 0.15)',
                        my: 1.5,
                    }}
                />

                {/* Cena */}
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            background:
                                'linear-gradient(135deg, #C4B5FD 0%, #7C3AED 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 800,
                            fontSize: '1.25rem',
                        }}
                    >
                        {formatPrice(car.price)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CarCard;