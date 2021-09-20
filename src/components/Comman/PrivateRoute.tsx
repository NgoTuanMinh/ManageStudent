import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

function PrivateRoute(props: RouteProps) {
    const access_token = Boolean(localStorage.getItem("access_token"));
    if (!access_token) {
        return <Redirect to="/login" />
    }
    return <Route {...props} />;
}

export default PrivateRoute;