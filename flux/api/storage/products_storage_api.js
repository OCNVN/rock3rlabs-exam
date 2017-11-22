/**
 * Created by carloslucero on 11/22/17.
 */
let query = require('array-query');
let Q = require('q');
let _ = require('underscore');

let Brands = require('../../../data/Brands');
let ClothingTypes = require('../../../data/ClothingTypes');

let ngramWordTokenizer = function(argumento) {
    let words = argumento.split(' ');
    let ngramWords = []; // [{size: |size|, ngrams: |actual ngrams|}]

    // Delete extra white spaces
    // words = _.without(words, '');

    for(let size = 1; size <= 5; size++) {
        let ngramWordPayload = {size};


        let ngrams = [];
        for(let chunckStep = 0; chunckStep < words.length; chunckStep ++) {
            let ngram = words.slice(chunckStep, chunckStep + size);
            if(ngram.length === size)
                ngrams.push(ngram);
        }
        ngramWordPayload.ngrams = ngrams;

        ngramWords.push(ngramWordPayload);
    }

    return ngramWords;
};

let brandSearchNgramWords = function(ngramWordPayload) {
    let {ngrams, size} = ngramWordPayload;

    let encontrados = []; // [stringFound: |string found|, results: [brand: {name: '...'}, weight: |size|]]

    _.each(ngrams, ngram => {
        let wordByNgramsCombined = _.reduce(ngram, (payload, word) => payload + " " + word );
        let resultado = query('name.toLowerCase()').equals(wordByNgramsCombined).on(Brands);

        if(resultado.length > 0)
            encontrados.push({
                stringFound: wordByNgramsCombined,
                results: resultado,
                weight: size
            });
    });

    return encontrados;
};

let clothingTypeSearchNgramWords = function(ngramWordPayload) {
    let {ngrams, size} = ngramWordPayload;

    let encontrados = []; // [stringFound: |string found|, results: [brand: {name: '...'}, weight: |size|]]

    _.each(ngrams, ngram => {
        let wordByNgramsCombined = _.reduce(ngram, (payload, word) => payload + " " + word );
        let resultado = query('name.toLowerCase()').equals(wordByNgramsCombined).on(ClothingTypes);

        if(resultado.length > 0)
            encontrados.push({
                stringFound: wordByNgramsCombined,
                results: resultado,
                weight: size
            });
    });

    return encontrados;
};

var ProductsStorageAPI = {
    buscar: function(argumento){
        let deferred = Q.defer();

        // Just validate null or undefined values of argumento
        argumento = argumento ? argumento.toLowerCase() : '';

        let ngramWords = ngramWordTokenizer(argumento);

        // BRAND SEARCH
        let resultadosByBrand = [];
        _.each(ngramWords, ngramWord => {
            let results = brandSearchNgramWords(ngramWord);
            if(results && results.length > 0)
                resultadosByBrand.push(results);
        });

        console.trace(resultadosByBrand);

        // CLOTHING TYPES SEARCH
        let resultadosByClothingType = [];
        _.each(ngramWords, ngramWord => {
            let results = clothingTypeSearchNgramWords(ngramWord);
            if(results && results.length > 0)
                resultadosByClothingType.push(results);
        });

        console.trace(resultadosByClothingType);





        deferred.resolve({resultadosByBrand, resultadosByClothingType});

        return deferred.promise;
    }
};

module.exports = ProductsStorageAPI;