import React from 'react';
import ReactDOM from 'react-dom';
import MainAppComponent from './MainAppComponent.react';

// CSS
require('../css/main.scss');

exports.renderApp = function(domContainerNode){
    ReactDOM.render((<MainAppComponent/>),
        domContainerNode
    );
};
