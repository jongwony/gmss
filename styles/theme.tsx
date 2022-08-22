import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: `
        .header {
          text-align: center;
        }
      `,
    },
  },
  palette: {
    mode: "dark",
  },
});
