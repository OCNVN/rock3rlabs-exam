import React from 'react';
import _ from 'underscore';
import update from 'react-addons-update';
import AppStore from '../../flux/stores/AppStore';
import html from 'react-escape-html';

// CSS
require('../../css/components/resultados-component.scss');

class ResultadoItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let {resultadosByBrand, resultadosByClothingType, argumento} = this.props.resultado;

        let bestResultByBrand = this._bestResultadoByBrand(resultadosByBrand);

        let brandFound = bestResultByBrand.stringFound.toLowerCase();
        let argumentoLower = argumento.toLowerCase();

        let brandStart = argumentoLower.indexOf(brandFound);
        let brandEnd = brandStart + brandFound.length;

        let argumentoParsed = argumento.substring(0, brandStart) + "<strong>" + argumento.substring(brandStart, brandEnd) + "</strong>" + argumento.substring(brandEnd, argumento.length)


        let bestResultByClothingType = this._bestResultadoByClothingType(resultadosByClothingType);

        let clothingTypeFound = bestResultByClothingType.stringFound.toLowerCase();
        argumentoLower = argumentoParsed.toLowerCase();

        let clothingTypeStart = argumentoLower.indexOf(clothingTypeFound);
        let clothingTypeEnd = clothingTypeStart + clothingTypeFound.length;

        argumentoParsed = argumentoParsed.substring(0, clothingTypeStart) + "<em>" + argumentoParsed.substring(clothingTypeStart, clothingTypeEnd) + "</em>" + argumentoParsed.substring(clothingTypeEnd, argumentoParsed.length)

        return(
            <div>
                <div dangerouslySetInnerHTML={{ __html: argumentoParsed }} />
            </div>
        )
    }

    _bestResultadoByBrand = (resultadosByBrand) => {
        let weight = 0;
        let stringFound = "";
        _.each(resultadosByBrand, resultadoByBrand => { // [stringFound "", weight #, results []]
            _.each(resultadoByBrand, resultado => {
                console.trace(resultado);
                if(resultado.weight > weight){
                    weight = resultado.weight;
                    stringFound = resultado.stringFound;
                }
            })
        });

        return {stringFound, weight};
    };

    _bestResultadoByClothingType = (resultadosByClothingType) => {
        let weight = 0;
        let stringFound = "";
        _.each(resultadosByClothingType, resultadoByClothingType => { // [stringFound "", weight #, results []]
            _.each(resultadoByClothingType, resultado => {
                console.trace(resultado);
                if(resultado.weight > weight){
                    weight = resultado.weight;
                    stringFound = resultado.stringFound;
                }
            })
        });

        return {stringFound, weight};
    };
}

export default class ResultadosComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: []
        };
    }

    componentWillMount() {
        AppStore.addItemLoadedListener(this._onItemResultadoLoaded);
    }

    componentWillUnmount() {
        AppStore.removeItemLoadedListener(this._onItemResultadoLoaded);
    }

    render() {
        let resultadosItems = [];
        _.each(this.state.resultados, resultado => {
            resultadosItems.unshift(
                <ResultadoItemComponent resultado={resultado}/>
            )
        });

        return(
            <div className="resultados-component">
                {resultadosItems}
            </div>
        )
    }

    _onItemResultadoLoaded = () => {
        let resultados = AppStore.getResultados();
        this.setState({resultados})
    }
}

ResultadosComponent.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};