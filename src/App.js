import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./Context/Context";

import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp";
import WizardAmount from "./Pages/WizardAmount";
import WizardCategories from "./Pages/WizardCategories";
import WizardCategoriesAmount from "./Pages/WizardCategoriesAmount";
import Overview from "./Pages/Overview";
import Categories from "./Pages/Categories";
import Statistics from "./Pages/Statistics";
import NotFound from "./Pages/NotFound";

import ScrollToTop from "./Components/ScrollToTop";

import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const style = {
  backgroundImage: "url('./Images/bg-img.png')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
};

export let deferredPrompt;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt fired....");
  e.preventDefault();
  deferredPrompt = e;
  return false;
});

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6200ee",
      },
      secondary: {
        main: grey[600],
        dark: grey[700],
        light: grey[400],
        extraLight: grey[50],
      },
      info: {
        main: "#0fdddd",
      },
    },
  });

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <Box sx={style}>
          <Router>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/wizard-amount" element={<WizardAmount />} />
                <Route
                  path="/wizard-categories"
                  element={<WizardCategories />}
                />
                <Route
                  path="/wizard-categories-amount"
                  element={<WizardCategoriesAmount />}
                />
                <Route path="/overview" element={<Overview />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ScrollToTop>
          </Router>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
