import React from 'react';
import _ from 'underscore';
import update from 'react-addons-update';
import AppActions from '../../flux/actions/AppActions';
import AppStore from '../../flux/stores/AppStore';

// CSS
require('../../css/components/search-component.scss');

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            argumento: ''
        };
    }

    componentWillMount() {
    }

    render() {

        return(
            <div className="search-component">
                <div style={{display: 'inline-flex', width: 'calc(100% - 80px)', margin: '5px 15px'}}>
                    <input className="search-input"
                           type="text"
                           placeholder="What are you looking for today?"
                           onChange={this._onArgumentoChangeHandler}
                           value={this.state.argumento}/>
                </div>
                <div className="search-button" onClick={this._onSearchHandler}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
            </div>
        )
    }

    _onArgumentoChangeHandler = (event) => {
        let argumento = event.currentTarget.value;
        this.setState({argumento});
    };

    _onSearchHandler = () => {
        AppActions.buscar(this.state.argumento);
    };
}

SearchComponent.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};