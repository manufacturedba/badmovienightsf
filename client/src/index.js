import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faMeetup } from '@fortawesome/free-brands-svg-icons/faMeetup'

library.add(faFacebook, faGithub, faMeetup);
ReactDOM.render(<App />, document.getElementById('root'));
