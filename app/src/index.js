import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store from './store';
import routes from './routes';
import history from './history';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {
          routes.map(r => <Route key={r.path} {...r} />)
        }
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
