import game                       from './game';
//----------------------------------------------------
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { Router, Route }                from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk                            from 'redux-thunk'
import history                          from './app/utils/history';
import rootReducer                      from './app/rootReducer';
import App                              from './app/app';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
<Router  history={history}>
  <Provider store={store}>
    <Route component={App} />
  </Provider>
</Router>,
document.getElementById('root')
);

