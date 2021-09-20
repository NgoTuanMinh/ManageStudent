import NotFound from 'components/Comman/NotFound';
import PrivateRoute from 'components/Comman/PrivateRoute';
import Admin from 'components/Layout/Admin';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

function App() {
  
  return (<div>
    <Switch>
      <Route path="/login"> <LoginPage/> </Route>
      <PrivateRoute path="/admin"> <Admin/> </PrivateRoute>
      <Route> <NotFound/> </Route>
    </Switch>
    </div>
  );
}

export default App;
