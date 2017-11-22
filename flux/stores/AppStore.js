/**
 * Created by carloslucero on 11/22/17.
 */
let Dispatcher = require('../dispatcher/AppDispatcher');
let assign = require('object-assign');
let EventEmitter = require('events').EventEmitter;
let AppConstants = require('../constants/AppConstants');
let GlobalContext = require('../GlobalContext');

let RESULTADO_ITEM_LOADED = 'RESULTADO_ITEM_LOADED';

let resultados = []; // [argumento: ||, resultadosByBrand: {...}, resultadosByClothingType: {...}]

let loadResultadoItem = function(resultadoItem){
    resultados.push(resultadoItem);
};

let AppStore = assign({}, EventEmitter.prototype, {
    getResultados: function(){
        return resultados;
    },

    emitItemLoaded: function() {
        this.emit(RESULTADO_ITEM_LOADED);
    },

    addItemLoadedListener: function(callback) {
        this.on(RESULTADO_ITEM_LOADED, callback);
    },

    removeItemLoadedListener: function(callback) {
        this.removeListener(RESULTADO_ITEM_LOADED, callback);
    }
});

Dispatcher.register(function(action) {
    switch(action.actionType) {
        case AppConstants.resultados.ITEM_LOADED: {
            let {resultadosByBrand, resultadosByClothingType, argumento}  = action.payload;
            loadResultadoItem({resultadosByBrand, resultadosByClothingType, argumento});
            AppStore.emitItemLoaded();

            break;
        }

        default:
    }
});

module.exports = AppStore;