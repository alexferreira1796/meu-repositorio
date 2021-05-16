import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../pages/Main';
import Repositorio from '../pages/Repositorio';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repositorio/:repositorio" exact component={Repositorio} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes;