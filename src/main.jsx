import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import App from './App.jsx'

import { ToastProvider } from './context/ToastContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { PostsProvider } from './context/PostsContext.jsx';
import { CommentsProvider } from './context/CommentsContext.jsx'
import { CloudinaryProvider } from './context/CloudinaryContext.jsx'

createRoot(document.getElementById('root')).render(

    <StrictMode>
        <NextUIProvider>
            <ToastProvider>
                <AuthProvider>
                    <UserProvider>
                        <CloudinaryProvider>
                            <PostsProvider>
                                <CommentsProvider>
                                    <App />
                                </CommentsProvider>
                            </PostsProvider>
                        </CloudinaryProvider>
                    </UserProvider>
                </AuthProvider>
            </ToastProvider>
        </NextUIProvider>
    </StrictMode>,
)
