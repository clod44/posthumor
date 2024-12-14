import React, { createContext } from 'react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    return (
        <ToastContext.Provider value={toast}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Slide}
            />
            {children}
        </ToastContext.Provider>
    );
};
