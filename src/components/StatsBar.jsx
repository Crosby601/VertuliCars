import React from 'react';
import { Box, Typography, Paper, Grid, Chip } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PaidIcon from '@mui/icons-material/Paid';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BoltIcon from '@mui/icons-material/Bolt';
import {
    formatPrice,
    calculateAveragePrice,
    calculateTotalHorsepower,
    findMostExpensive,
    findMostPowerful,
    countByFuelType,
    getFullName,
} from '../utils/filters';

// Komponent pojedynczej statystyki – czysta funkcja renderująca
const StatItem = ({ icon, label, value, color }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            p: 2,
        }}
    >
        <Box
            sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${color}20`,
                border: `1px solid ${color}40`,
                mb: 1,
            }}
        >
            {icon}
        </Box>
        <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}
        >
            {label}
        </Typography>
        <Typography
            variant="body2"
            sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.85rem' }}
        >
            {value}
        </Typography>
    </Box>
);

const StatsBar = ({ cars }) => {
    // Obliczenia wykonywane z czystych funkcji reduce (zgodnie z dokumentacją :) )
    const avgPrice = calculateAveragePrice(cars);
    const totalHP = calculateTotalHorsepower(cars);
    const mostExpensive = findMostExpensive(cars);
    const mostPowerful = findMostPowerful(cars);
    const fuelCounts = countByFuelType(cars);

    if (cars.length === 0) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    mb: 4,
                    textAlign: 'center',
                    background: 'linear-gradient(145deg, #1A1128 0%, #221738 100%)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ color: 'text.secondary', mb: 1 }}
                >
                    😔 Brak wyników
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Spróbuj zmienić kryteria filtrowania
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 4,
                background: 'linear-gradient(145deg, #1A1128 0%, #221738 100%)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
            }}
        >
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                {/* Liczba wyników */}
                <Grid item xs={6} sm={4} md={2}>
                    <StatItem
                        icon={
                            <DirectionsCarIcon sx={{ color: '#7C3AED', fontSize: 24 }} />
                        }
                        label="Znaleziono"
                        value={`${cars.length} aut`}
                        color="#7C3AED"
                    />
                </Grid>

                {/* Średnia cena */}
                <Grid item xs={6} sm={4} md={2}>
                    <StatItem
                        icon={<PaidIcon sx={{ color: '#34D399', fontSize: 24 }} />}
                        label="Śr. cena"
                        value={formatPrice(avgPrice)}
                        color="#34D399"
                    />
                </Grid>

                {/* Łączna moc */}
                <Grid item xs={6} sm={4} md={2}>
                    <StatItem
                        icon={<BoltIcon sx={{ color: '#FBBF24', fontSize: 24 }} />}
                        label="Łączna moc"
                        value={`${totalHP.toLocaleString('pl-PL')} KM`}
                        color="#FBBF24"
                    />
                </Grid>

                {/* Najdroższy */}
                <Grid item xs={6} sm={4} md={3}>
                    <StatItem
                        icon={
                            <EmojiEventsIcon sx={{ color: '#F59E0B', fontSize: 24 }} />
                        }
                        label="Najdroższy"
                        value={
                            mostExpensive
                                ? `${getFullName(mostExpensive)}`
                                : '-'
                        }
                        color="#F59E0B"
                    />
                </Grid>

                {/* Najmocniejszy */}
                <Grid item xs={6} sm={4} md={3}>
                    <StatItem
                        icon={<SpeedIcon sx={{ color: '#F87171', fontSize: 24 }} />}
                        label="Najmocniejszy"
                        value={
                            mostPowerful
                                ? `${getFullName(mostPowerful)} (${mostPowerful.horsepower} KM)`
                                : '-'
                        }
                        color="#F87171"
                    />
                </Grid>
            </Grid>

            {/* Chipy z podziałem na paliwo */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                    mt: 2,
                    pt: 2,
                    borderTop: '1px solid rgba(124, 58, 237, 0.15)',
                }}
            >
                {Object.entries(fuelCounts).map(([fuel, count]) => (
                    <Chip
                        key={fuel}
                        label={`${fuel}: ${count}`}
                        size="small"
                        sx={{
                            background: 'rgba(124, 58, 237, 0.15)',
                            color: 'secondary.light',
                            border: '1px solid rgba(124, 58, 237, 0.25)',
                            fontWeight: 600,
                        }}
                    />
                ))}
            </Box>
        </Paper>
    );
};

export default StatsBar;