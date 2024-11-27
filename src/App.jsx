import { useState } from 'react';
import { AppShell } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
                padding="md"
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
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
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
