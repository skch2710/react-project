import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins_Regular", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    subtitle1: {
      fontSize: "18px",
    },
  },
  colors: {
    blue: {
      btnBgm: "#053C6A",
      btnBgmHover: "#031253",
    },
    white: {
      btn: "#FFFFFF",
      btnBgm: "#EEEEEE",
      btnBorder: "#E2E2E2",
      100: "#F0F2FF",
      200: "#E0E0E0",
    },
    gray: {
      btn: "#9E9E9E",
      100: "#BDBDBD",
    },
    teal: {
      btn: "#1BADBB",
    },
  },
});

export default theme;