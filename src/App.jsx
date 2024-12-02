import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import MainNav from './components/MainNav';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Create from './pages/Create';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/messages" element={<ProtectedRoute redirect='/login' element={<Messages />} />} />
                <Route path="/notifications" element={<ProtectedRoute redirect='/login' element={<Notifications />} />} />
                <Route path="/create" element={<ProtectedRoute redirect='/login' element={<Create />} />} />
                <Route path="/login" element={<ProtectedRoute redirect='/profile' redirectIfUserLoggedIn={true} element={<Login />} />} />
                <Route path="/profile" element={<ProtectedRoute redirect='/login' element={<Profile />} />} />
                <Route path="/settings" element={<ProtectedRoute redirect='/login' element={<Settings />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <MainNav />
            <div className='h-16' /> {/* main nav gap */}
        </Router >
    );
}

export default App;
