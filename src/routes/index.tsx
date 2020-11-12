import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Debt from '../pages/Debt';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/Signup';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/debt" component={Debt} isPrivate />
  </Switch>
);

export default Routes;
