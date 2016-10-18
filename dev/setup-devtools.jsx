import React from 'react';

import { createDevTools } from 'redux-devtools';

import Dispatcher from 'redux-devtools-dispatch';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

import MultipleMonitors from '../src';
import * as actions from './todos/src/actions';

export const ReduxDevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={ true }
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
  >
    <MultipleMonitors toggles="text">
      <Dispatcher actionCreators={ actions } startCollapsed={ true }/>
      <LogMonitor />
    </MultipleMonitors>
  </DockMonitor>
);
