import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from './Context/Context';

//pages imports
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp';
import WizardAmount from './Pages/WizardAmount';
import WizardCategories from './Pages/WizardCategories';
import WizardCategoriesAmount from './Pages/WizardCategoriesAmount';
import Overview from './Pages/Overview';
import NewEntryModal from './Pages/NewEntryModal';
import Categories from './Pages/Categories';
import Statistics from './Pages/Statistics';
import Entries from './Pages/Entries';
import NotFound from './Pages/NotFound';

import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deepPurple, grey } from '@mui/material/colors';

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: deepPurple[800],
            },
            secondary: {
                main: grey[600],
            },
            dark: {
                main: grey[900],
            },
            light: {
                main: grey[50],
            },
            components: {
                MuiIcon: {
                    defaultProps: {
                        baseClassName: 'material-icons-two-tone',
                    },
                },
            },
        },
    });

    return (
        <Provider>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        backgroundImage: "url('./Images/bg-img.png')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Router>
                        <Routes>
                            <Route path="/" element={<SignIn />}></Route>
                            <Route path="/signUp" element={<SignUp />}></Route>
                            <Route
                                path="/wizard-amount"
                                element={<WizardAmount />}
                            ></Route>
                            <Route
                                path="/wizard-categories"
                                element={<WizardCategories />}
                            ></Route>
                            <Route
                                path="/wizard-categories-amount"
                                element={<WizardCategoriesAmount />}
                            ></Route>
                            <Route
                                path="/overview"
                                element={<Overview />}
                            ></Route>
                            <Route
                                path="/new-entry"
                                element={<NewEntryModal />}
                            ></Route>
                            <Route
                                path="/categories"
                                element={<Categories />}
                            ></Route>
                            <Route
                                path="/statistics"
                                element={<Statistics />}
                            ></Route>
                            <Route
                                path="/entries"
                                element={<Entries />}
                            ></Route>
                            {/* <Route path="/entries/income" element={<Income />}></Route>
                            <Route path="/entries/expense" element={<Expense />}></Route> */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </Box>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
