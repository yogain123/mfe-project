import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import './styles.css';

// This is for standalone development/testing of the Header MFE
// In the Shell app, only the Header component is imported
ReactDOM.render(<Header />, document.getElementById('root')); 