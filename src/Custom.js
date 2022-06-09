import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import App from "./App";
import themes from "./themes";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Custom = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={themes({
          isOpen: [],
          fontFamily: "'Roboto', sans-serif",
          borderRadius: 12,
          opened: true,
        })}
      >
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

// export default App;
export default withAuthenticationRequired(Custom, {
  onRedirecting: () => <>Loading..</>,
});
