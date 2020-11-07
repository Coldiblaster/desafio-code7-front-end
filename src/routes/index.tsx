import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Debt from '../pages/Debt';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Debt} />
  </Switch>
);

export default Routes;
