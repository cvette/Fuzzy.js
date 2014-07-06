var Fuzzificator = require('fuzzificator');

/**
 * @class
 * @requires Fuzzificator
 * @module FuzzySystem
 * @license MIT
 * */
function FuzzySystem() {
    var self = this;
    var fuzzificators = [];
    var defuzzificators = [];
    var inputValues = [];

    self.setInput = function (name, value) {
        inputValues[name] = value;
    };

    self.getInput = function (name) {
        return inputValues[name];
    };

    self.evaluate = function () {
        var fuzzified = [];

        for(var i in fuzzificators) {
            if(fuzzificators.hasOwnProperty(i)) {
                fuzzified.push(fuzzificators[i].fuzzify(self.getInput(fuzzificators[i]), inputValues));
            }
        }


    };

    /**
     *
     * @param name
     * @returns {Object}
     */
    self.fuzzify = function (name) {
        if(name in fuzzificators) {
            return fuzzificators[name];
        } else {
            fuzzificators[name] = Fuzzificator();
            return fuzzificators[name];
        }
    };

    /**
     *
     * @param name
     * @returns {Object}
     */
    self.defuzzify = function (name) {
        if(name in defuzzificators) {
            return defuzzificators[name];
        } else {
            defuzzificators[name] = Defuzzificator();
            return defuzzificators[name];
        }
    };
}


/** Module Exports */
module.exports = function () {
    return new FuzzySystem();
};