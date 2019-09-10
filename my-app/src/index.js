import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import Hiking from './components/Hiking'

ReactDOM.render(
    <Router>
        <Hiking />
    </Router>
    , document.getElementById('root'))
