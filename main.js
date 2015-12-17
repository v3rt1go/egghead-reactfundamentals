'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(
    // Passing values to components is done with the props obj. In jsx it looks
    // a lot like html attributes on html tags
    <App txt="this is the props value" cat={6} />, 
    document.getElementById('app')
);