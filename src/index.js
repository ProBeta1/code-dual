import React from 'react';
import './assets/main.css'

import { unstable_createRoot } from 'react-dom';

import App from "./App";

unstable_createRoot(document.getElementById('root')).render(<App />);