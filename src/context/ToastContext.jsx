import React, { createContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    return (
        <ToastContext.Provider value={toast}>
            <ToastContainer />
            {children}
        </ToastContext.Provider>
    );
};
