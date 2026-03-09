import React, { useState, useMemo, useEffect } from 'react';
import {
    ThemeProvider,
    CssBaseline,
    Container,
    Grid,
    Box,
    Typography,
    Fade,
} from '@mui/material';
import theme from './theme/theme';
import cars from './data/cars';
import {
    applyAllFilters,
    getUniqueBrands,
    getUniqueFuelTypes,
} from './utils/filters';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import StatsBar from './components/StatsBar';
import CarCard from './components/CarCard';

const DEFAULT_FILTERS = {
    search: '',
    brand: 'Wszystkie',
    fuelType: 'Wszystkie',
    priceRange: [50000, 900000],
    yearRange: [2015, 2024],
    minHorsepower: 0,
    sortBy: 'price-asc',
    onlyAvailable: false,
};

const App = () => {
    // useState – stan filtrów wybranych przez użytkownika
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    // useMemo – unikalne marki i paliwa obliczane raz
    const brands = useMemo(() => getUniqueBrands(cars), []);
    const fuelTypes = useMemo(() => getUniqueFuelTypes(cars), []);

    // useMemo - przelicza wyniki tylko gdy zmienią się filtry
    const filteredCars = useMemo(
        () => applyAllFilters(cars, filters),
        [filters]
    );

    // useMemo – ile filtrów jest aktywnych
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.search !== DEFAULT_FILTERS.search) count++;
        if (filters.brand !== DEFAULT_FILTERS.brand) count++;
        if (filters.fuelType !== DEFAULT_FILTERS.fuelType) count++;
        if (filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0]) count++;
        if (filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]) count++;
        if (filters.yearRange[0] !== DEFAULT_FILTERS.yearRange[0]) count++;
        if (filters.yearRange[1] !== DEFAULT_FILTERS.yearRange[1]) count++;
        if (filters.minHorsepower !== DEFAULT_FILTERS.minHorsepower) count++;
        if (filters.onlyAvailable !== DEFAULT_FILTERS.onlyAvailable) count++;
        return count;
    }, [filters]);

    // useEffect – aktualizacja tytułu strony
    useEffect(() => {
        document.title = `VERTULI | ${filteredCars.length} aut`;
    }, [filteredCars.length]);

    // Aktualizacja pojedynczego filtra
    const handleFilterChange = (filterName, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }));
    };

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(180deg, #0F0A1A 0%, #130D20 50%, #0F0A1A 100%)',
                }}
            >
                <Header />

                <Container maxWidth="xl" sx={{ py: 4 }}>
                    <FilterPanel
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onResetFilters={handleResetFilters}
                        brands={brands}
                        fuelTypes={fuelTypes}
                        activeFiltersCount={activeFiltersCount}
                    />

                    <StatsBar cars={filteredCars} />

                    {filteredCars.length > 0 ? (
                        <Grid container spacing={3}>
                            {filteredCars.map((car, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
                                    <Fade in timeout={300 + index * 50}>
                                        <Box>
                                            <CarCard car={car} />
                                        </Box>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography sx={{ fontSize: '4rem', mb: 2 }}>
                                🏁
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ color: 'text.secondary', mb: 1 }}
                            >
                                Brak wyników
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: 'text.secondary', opacity: 0.7 }}
                            >
                                Zmień kryteria filtrowania, aby znaleźć swoje wymarzone auto
                            </Typography>
                        </Box>
                    )}

                    <Box
                        sx={{
                            textAlign: 'center',
                            mt: 6,
                            py: 3,
                            borderTop: '1px solid rgba(124, 58, 237, 0.15)',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', opacity: 0.5 }}
                        >
                            © 2026 VERTULI Auto Selection
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default App;