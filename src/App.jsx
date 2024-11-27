import { useState } from 'react';
import { AppShell } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import SideNav from './components/SideNav';
import Footer from './components/Footer';

import Home from './pages/Home';
import Search from './pages/Search';
import Explore from './pages/Explore';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Create from './pages/Create';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
    const [opened, setOpened] = useState(false);
    const toggle = () => setOpened((prev) => !prev);

    return (
        <Router>
            <AppShell
                header={{ height: 60 }}
                footer={{ height: 60 }}
                navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                padding={{ base: 5, sm: "sm" }}
            >
                <AppShell.Header>
                    <Header opened={opened} toggle={toggle} />
                </AppShell.Header>

                <AppShell.Navbar p="md">
                    <SideNav />
                </AppShell.Navbar>

                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/messages" element={<ProtectedRoute redirect='/login' element={<Messages />} />} />
                        <Route path="/notifications" element={<ProtectedRoute redirect='/login' element={<Notifications />} />} />
                        <Route path="/create" element={<ProtectedRoute redirect='/login' element={<Create />} />} />
                        <Route path="/login" element={<ProtectedRoute redirect='/profile' redirectIfUserLoggedIn={true} element={<Login />} />} />
                        <Route path="/profile" element={<ProtectedRoute redirect='/login' element={<Profile />} />} />
                        <Route path="/settings" element={<ProtectedRoute redirect='/login' element={<Settings />} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AppShell.Main>

                <AppShell.Footer p="md">
                    <Footer />
                </AppShell.Footer>
            </AppShell>
        </Router>
    );
}

export default App;
