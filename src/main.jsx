import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from './config/theme'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(

    <StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="dark" withGlobalStyles withNormalizeCSS>
            <UserProvider>
                <App />
            </UserProvider>
        </MantineProvider>
    </StrictMode>,
)
