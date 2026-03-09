import React from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Slider,
    FormControlLabel,
    Checkbox,
    Typography,
    Paper,
    Grid,
    Button,
    Chip,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SortIcon from '@mui/icons-material/Sort';
import { formatPrice } from '../utils/filters';

const HORSEPOWER_OPTIONS = [0, 150, 200, 300, 400, 500, 600];
const SORT_OPTIONS = [
    { value: 'price-asc', label: 'Cena: rosnąco' },
    { value: 'price-desc', label: 'Cena: malejąco' },
    { value: 'hp-desc', label: 'Moc: malejąco' },
    { value: 'hp-asc', label: 'Moc: rosnąco' },
    { value: 'year-desc', label: 'Rocznik: najnowsze' },
    { value: 'year-asc', label: 'Rocznik: najstarsze' },
    { value: 'name-asc', label: 'Nazwa: A-Z' },
    { value: 'name-desc', label: 'Nazwa: Z-A' },
];

const FilterPanel = ({
                         filters,
                         onFilterChange,
                         onResetFilters,
                         brands,
                         fuelTypes,
                         activeFiltersCount,
                     }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 4,
                background: 'linear-gradient(145deg, #1A1128 0%, #221738 100%)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
            }}
        >
            {/* Nagłówek filtrów */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterAltIcon sx={{ color: 'primary.light' }} />
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                        Filtry
                    </Typography>
                    {activeFiltersCount > 0 && (
                        <Chip
                            label={`${activeFiltersCount} aktywne`}
                            size="small"
                            sx={{
                                background: 'rgba(124, 58, 237, 0.3)',
                                color: 'secondary.light',
                                fontWeight: 700,
                            }}
                        />
                    )}
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={onResetFilters}
                    size="small"
                    sx={{
                        borderColor: 'rgba(124, 58, 237, 0.4)',
                        color: 'secondary.main',
                        '&:hover': {
                            borderColor: 'primary.main',
                            background: 'rgba(124, 58, 237, 0.1)',
                        },
                    }}
                >
                    Resetuj filtry
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Wyszukiwarka taka o */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Szukaj marki lub modelu"
                        variant="outlined"
                        value={filters.search}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'primary.light' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& label': { color: 'text.secondary' },
                            '& label.Mui-focused': { color: 'primary.light' },
                        }}
                    />
                </Grid>

                {/* Select – Marka */}
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: 'text.secondary' }}>
                            Marka
                        </InputLabel>
                        <Select
                            value={filters.brand}
                            label="🚗 Marka"
                            onChange={(e) => onFilterChange('brand', e.target.value)}
                        >
                            <MenuItem value="Wszystkie">Wszystkie</MenuItem>
                            {brands.map((brand) => (
                                <MenuItem key={brand} value={brand}>
                                    {brand}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Select – Paliwo */}
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: 'text.secondary' }}>
                            Paliwo
                        </InputLabel>
                        <Select
                            value={filters.fuelType}
                            label="Paliwo"
                            onChange={(e) => onFilterChange('fuelType', e.target.value)}
                        >
                            <MenuItem value="Wszystkie">Wszystkie</MenuItem>
                            {fuelTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type === 'Elektryk' && '⚡ '}
                                    {type === 'Hybryda' && '🔋 '}
                                    {type === 'Benzyna' && '⛽ '}
                                    {type === 'Diesel' && '🛢️ '}
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Slider – Zakres ceny */}
                <Grid item xs={12} md={6}>
                    <Typography
                        gutterBottom
                        sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}
                    >
                        Zakres ceny
                    </Typography>
                    <Box sx={{ px: 1 }}>
                        <Slider
                            value={filters.priceRange}
                            onChange={(_, newValue) =>
                                onFilterChange('priceRange', newValue)
                            }
                            valueLabelDisplay="auto"
                            valueLabelFormat={(v) => formatPrice(v)}
                            min={50000}
                            max={900000}
                            step={10000}
                            sx={{
                                '& .MuiSlider-valueLabel': {
                                    background: 'rgba(124, 58, 237, 0.9)',
                                    borderRadius: '8px',
                                    fontSize: '0.75rem',
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {formatPrice(filters.priceRange[0])}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {formatPrice(filters.priceRange[1])}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Slider – Zakres rocznika */}
                <Grid item xs={12} md={6}>
                    <Typography
                        gutterBottom
                        sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}
                    >
                        Rocznik
                    </Typography>
                    <Box sx={{ px: 1 }}>
                        <Slider
                            value={filters.yearRange}
                            onChange={(_, newValue) =>
                                onFilterChange('yearRange', newValue)
                            }
                            valueLabelDisplay="auto"
                            min={2015}
                            max={2024}
                            step={1}
                            marks
                            sx={{
                                '& .MuiSlider-valueLabel': {
                                    background: 'rgba(124, 58, 237, 0.9)',
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {filters.yearRange[0]}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {filters.yearRange[1]}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Select – Minimalna ilość koni dla zajawkowicza */}
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: 'text.secondary' }}>
                            Min. moc
                        </InputLabel>
                        <Select
                            value={filters.minHorsepower}
                            label="Min. moc"
                            onChange={(e) =>
                                onFilterChange('minHorsepower', e.target.value)
                            }
                        >
                            {HORSEPOWER_OPTIONS.map((hp) => (
                                <MenuItem key={hp} value={hp}>
                                    {hp === 0 ? 'Dowolna' : `${hp}+ KM`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Select – Sortowanie */}
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: 'text.secondary' }}>
                            <SortIcon
                                sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }}
                            />
                            Sortuj
                        </InputLabel>
                        <Select
                            value={filters.sortBy}
                            label="🔄 Sortuj"
                            onChange={(e) => onFilterChange('sortBy', e.target.value)}
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Checkbox - Tylko dostępne bo jakby tego nie było to bym nie zdał */}
                <Grid item xs={12} sm={6} md={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.onlyAvailable}
                                onChange={(e) =>
                                    onFilterChange('onlyAvailable', e.target.checked)
                                }
                                sx={{
                                    color: 'primary.light',
                                    '&.Mui-checked': { color: 'success.main' },
                                }}
                            />
                        }
                        label={
                            <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                Tylko dostępne od ręki
                            </Typography>
                        }
                        sx={{ mt: 1 }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FilterPanel;