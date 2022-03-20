import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Layout from './components/layout';
import '../src/styles/tools.less';
import '../src/styles/pages.less';
import 'pnotify/dist/PNotifyBrightTheme.css';
import store from './states/store';


ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();