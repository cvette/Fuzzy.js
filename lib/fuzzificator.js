var LinguisticTerm = require('linguistic_term');

/**
 * Fuzzifies a single value and calculates
 * the degree of membership for each linguistic term
 *
 * @class
 * @module Fuzzificator
 * @requires LinguisticTerm
 * @license MIT
 */
function Fuzzificator() {
    var self = this;
    var terms = [];

    /**
     * Fuzzifies a given value
     * @param {Number} value The value to be fuzzified
     * @param {Array} allValues Other values might be needed for fuzzification
     * @returns {Array} Degree of membership for each linguistic term
     */
    self.fuzzify = function (value, allValues) {

    };

    /**
     *
     * @param {string} name
     * @param {string} points
     */
    self.createTerm = function (name, points) {
        if(name in terms) {
            return terms[name];
        } else {
            terms[name] = LinguisticTerm();
        }
    }
}


/** Module Exports */
module.exports = function () {
    return new Fuzzificator();
};