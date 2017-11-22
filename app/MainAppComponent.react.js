import React from 'react';
import SearchComponent from './components/SearchComponent.react';
import ResultadosComponent from './components/ResultadosComponent.react';
import AppStore from '../flux/stores/AppStore';

// CSS
require('../css/main-app-component.scss');

export default class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return(
            <div id="main-app-component">
                <SearchComponent/>
                <ResultadosComponent/>
            </div>
        )
    }

}

MainApp.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
