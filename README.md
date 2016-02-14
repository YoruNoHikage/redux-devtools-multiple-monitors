# Redux DevTools Multiple Monitors
Integrate multiple monitors to your redux devtools.

[![npm version](https://img.shields.io/npm/v/redux-devtools-multiple-monitors.svg?style=flat-square)](https://www.npmjs.com/package/redux-devtools-multiple-monitors)

### Installation

`npm install --save-dev redux-devtools-multiple-monitors`

### Usage

You can use `<MultipleMonitors>` to use multiple monitors into the `<DockMonitor>` for example :

```jsx
import React from 'react';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import Dispatcher from 'redux-devtools-dispatch';
import MultipleMonitors from 'redux-devtools-multiple-monitors';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
    <MultipleMonitors>
      <LogMonitor />
      <Dispatcher />
    </MultipleMonitors>
  </DockMonitor>
);
```

### Props

Name                  | Description
-------------         | -------------
`style`               | If you want to display different monitors in different places, you need to override this property using something like Flexbox

### Contributing

As this package is my second (first is [redux-devtools-dispatch](https://github.com/YoruNoHikage/redux-devtools-dispatch)), any comment, pull request, issue is welcome so I can learn more from everyone.

### License

MIT
