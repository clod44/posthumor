import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/UserContext.jsx';
import { PostProvider } from './context/PostContext.jsx';
import { CloudinaryProvider } from './context/CloudinaryContext.jsx'

createRoot(document.getElementById('root')).render(

    <StrictMode>
        <NextUIProvider>
            <UserProvider>
                <CloudinaryProvider>
                    <PostProvider>
                        <App />
                    </PostProvider>
                </CloudinaryProvider>
            </UserProvider>
        </NextUIProvider>
    </StrictMode>,
)
