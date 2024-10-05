import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useUserStore();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
