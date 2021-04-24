import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TextEditor from './TextEditor';
import CodeEditor from './CodeEditor';

import * as routes from 'constants/routes';
import Home from './Home';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.TEXT_EDITOR} component={TextEditor} />
        <Route path={routes.CODE_EDITOR} component={CodeEditor} />
        <Route path={routes.HOME} component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
