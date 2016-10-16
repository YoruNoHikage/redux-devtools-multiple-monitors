import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from 'react-redux';

import { ReduxDevTools } from './setup-devtools';
import App from './todos/src/components/App';
import reducer from './todos/src/reducers';

const store = Redux.createStore(
  reducer,
  ReduxDevTools.instrument()
);

const wrapper = document.createElement('div');
document.body.appendChild(wrapper);
ReactDOM.render(
  <Provider store={ store }>
    <div>
      <App/>
      <ReduxDevTools/>
    </div>
  </Provider>,
  wrapper
);
