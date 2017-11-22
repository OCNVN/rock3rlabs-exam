/**
 * Created by carloslucero on 11/22/17.
 */
let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');
let ProductStorageAPI = require('../api/storage/products_storage_api');

class AppActions {
    buscar = (argumento) => {
        ProductStorageAPI.buscar(argumento)
            .then(respuesta => {
                let {resultadosByBrand, resultadosByClothingType} = respuesta;

                AppDispatcher.dispatch({
                    actionType: AppConstants.resultados.ITEM_LOADED,
                    payload: {resultadosByBrand, resultadosByClothingType, argumento}
                });
            })
            .fail(error => {

            })
    }

}



module.exports = new AppActions();