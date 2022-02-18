import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pages imports
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp';
import WelcomeWizard from './Pages/WelcomeWizard';
import Overview from './Pages/Overview';
import NewEntryModal from './Pages/NewEntryModal';
import Categories from './Pages/Categories';
import Statistics from './Pages/Statistics';
import Entries from './Pages/Entries';
import NotFound from './Pages/NotFound';
import { Box } from '@mui/material';

function App() {
    return (
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
                    <Route path="/wizard" element={<WelcomeWizard />}></Route>
                    <Route path="/overview" element={<Overview />}></Route>
                    <Route
                        path="/new-entry"
                        element={<NewEntryModal />}
                    ></Route>
                    <Route path="/categories" element={<Categories />}></Route>
                    <Route path="/statistics" element={<Statistics />}></Route>
                    <Route path="/entries" element={<Entries />}></Route>
                    {/* <Route path="/entries/income" element={<Income />}></Route>
                <Route path="/entries/expense" element={<Expense />}></Route> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
