import { createTheme } from '@mui/material/styles';

//Motyw - lubię kolor fioletowy
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7C3AED',       // głęboki fiolet
            light: '#A78BFA',      // pastelowy fiolet
            dark: '#5B21B6',       // ciemny fiolet
        },
        secondary: {
            main: '#C4B5FD',       // jasny pastelowy fiolet
            light: '#EDE9FE',      // bardzo jasny fiolet
            dark: '#8B5CF6',       // jako taki fiolet
        },
        background: {
            default: '#0F0A1A',    // bardzo ciemne tło
            paper: '#1A1128',      // ciemny fioletowy
        },
        success: {
            main: '#34D399',       // pastelowy zielony (dostępność pojazdu)
        },
        error: {
            main: '#F87171',       // pastelowy czerwony (niedostępność pojazdu)
        },
        warning: {
            main: '#FBBF24',       // pastelowy żółty
        },
        text: {
            primary: '#EDE9FE',    // jasny biały
            secondary: '#A78BFA',  // coś w deseń "fiołkowego"
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontWeight: 800,
            letterSpacing: '0.05em',
        },
        h6: {
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        border: '1px solid rgba(124, 58, 237, 0.6)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(124, 58, 237, 0.25)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#7C3AED',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(124, 58, 237, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(124, 58, 237, 0.6)',
                    },
                },
            },
        },
    },
});

export default theme;