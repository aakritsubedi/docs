import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TextEditor from './TextEditor';
import CodeEditor from './CodeEditor';

import * as routes from 'constants/routes';
import Home from './Home';

const Routes = () => {
  const textEditorRoutes = routes.TEXT_EDITOR + '/:id';
  const codeEditorRoutes = routes.CODE_EDITOR + '/:id';
  
  return (
    <Router>
      <Switch>
        <Route path={textEditorRoutes} component={TextEditor} />
        <Route path={codeEditorRoutes} component={CodeEditor} />
        <Route path={routes.HOME} component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
