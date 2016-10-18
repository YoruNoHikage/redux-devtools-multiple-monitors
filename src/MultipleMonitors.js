import React, { Component, cloneElement } from 'react';
import * as themes from 'redux-devtools-themes';

function childrenMonitorState(props, state, action) {
  return props.children.map(child => child.type.update(child.props, state, action));
}

function reducer(props, state = {}, action) {
  return {
    childrenMonitorState: childrenMonitorState(props, state.childMonitorState, action),
  };
}

const defaultStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export default class MultipleMonitors extends Component {
  static update = reducer;

  constructor(props, context) {
    super(props, context);

    this.state = {
      enabledMonitors: this.props.children.map(e =>
        !e.props.startCollapsed
      ),
    };
  }

  getTheme() {
    let { theme } = this.props;

    if (typeof theme !== 'string') {
      return theme;
    }

    if (typeof themes[theme] !== 'undefined') {
      return themes[theme];
    }

    console.warn('DevTools theme ' + theme + ' not found, defaulting to nicinabox'); // eslint-disable-line no-console
    return themes.nicinabox;
  }

  getButtonStyle(theme) {
    const base = {
      backgroundColor: theme.base02,
      border: 'none',
      borderColor: theme.base00,
      borderRadius: 0,
      borderStyle: 'solid',
      borderWidth: '3px',
      color: theme.base10,
      cursor: 'pointer',
      fontSize: '0.8em',
      fontWeight: 'bold',
      margin: 'none',
      padding: '3px',
      textDecoration: 'none',
    };
    if (this.props.toggles === 'text') {
      return base;
    } else {
      return {
        ...base,
        maxHeight: '0.3em',
      };
    }
  }

  toggleMonitor(index) {
    this.setState(state => {
      return {
        enabledMonitors: state.enabledMonitors.map((value, i) =>
          i === index
            ? !value
            : value
        ),
      };
    });
  }

  render() {
    const { monitorState, children, style, toggles, ...rest } = this.props;
    const theme = this.getTheme();
    const buttonStyle = this.getButtonStyle(theme);

    const monitors = children.map((e, i) => cloneElement(e, {
      ...rest,
      monitorState: monitorState.childrenMonitorState[i],
      key: 'monitor' + i,
    }));
    const toggleButtons = monitors.map((e, index) => {
      const enabled = this.state.enabledMonitors[index];
      const icon = enabled ? '-' : '+';
      return <button type="button"
        style={{ ...buttonStyle, flexGrow: 0, flexShrink: 0 }}
        key={ 'toggle' + index }
        onClick={ () => this.toggleMonitor(index) }
        title={ (enabled ? 'Collapse' : 'Expand') + ' ' + e.type.name }
      >
        { toggles === 'text'
          && `${icon} ${e.type.name} ${icon}`
        }
      </button>;
    });

    return (
      <div style={style}>
        { monitors.map((e, i) =>
          [
            toggles ? toggleButtons[i] : undefined,
            this.state.enabledMonitors[i] && e,
          ]
        ) }
      </div>
    );
  }
}
MultipleMonitors.defaultProps = {
  style: defaultStyle,
  theme: 'nicinabox',
  toggles: false,
};
