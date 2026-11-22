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
      dark: "#053C6A",
      btnBgm: "#053C6A",
      btnBgmHover: "#031253",
    },
    monochrome: {
      tableBordersColor: "#E2E2E2",
      border: "#E2E2E2",
      offWhite: "#FFFFFF",
      tableHeaderBackground: "#F0F2FF",
      tableHeaderText: "#022038",
      tableCellColor: "#333333",
    },
    grey: {
      500: "#9E9E9E",
      inactive: "#9E9E9E",
    },
    green: {
      700: "#2E7D32",
      800: "#1B5E20",
    },
    red: {
      900: "#B71C1C",
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