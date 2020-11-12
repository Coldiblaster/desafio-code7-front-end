import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Debt from '../pages/Debt';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Debt} />
    <Route path="/signup" component={SignIn} />
  </Switch>
);

export default Routes;
