'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Wrapper from './Mounting.js';
import Lifecycle from './ComponentLifecycle.js';
import HigherOrder from './HigherOrderComponents.js';
import Composable from './ComposableComponents.js';
import Dynamic from './DynamicComponents.js';
import Transpiler from './Transpiler.js';

ReactDOM.render(
  // Passing values to components is done with the props obj. In jsx it looks
  // a lot like html attributes on html tags
  <App txt="this is the props value" cat={6} />, document.getElementById('app')
);
ReactDOM.render(<Wrapper />, document.getElementById('mount'));
ReactDOM.render(<Lifecycle />, document.getElementById('lifecycle'));
ReactDOM.render(<HigherOrder />, document.getElementById('higherorder'));
ReactDOM.render(<Composable />, document.getElementById('composable'));
ReactDOM.render(<Dynamic />, document.getElementById('dynamic'));
ReactDOM.render(<Transpiler />, document.getElementById('transpiler'));
