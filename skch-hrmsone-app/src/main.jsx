import { ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.jsx";
import theme from "./theme/theme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer autoClose={5000} pauseOnFocusLoss={false} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
