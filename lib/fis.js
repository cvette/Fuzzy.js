var MembershipFunction = require('membership_function');
var Variable = require('variable');

/**
 * @class
 * @requires Fuzzificator
 * @module FIS
 * @license MIT
 * */
function FIS() {
    var self = this;
    var inputs = []; //input variables
    var outputs = []; //output variables

    self.evaluate = function () {

    };

    /**
     * Check if a variable is defined
     * @private
     * */
    function isDefined(name) {
        return (inputs.hasOwnProperty(name) || outputs.hasOwnProperty(name));
    }

    function createVariable(name, range) {
        if (isDefined(name)) {
            throw new Error('variable with this name is already defined');
        }

        return Variable(name, range);
    }

    /**
     * Add a input variable
     * @param name
     * @param range
     * @returns {Variable}
     * @public
     */
    self.addInput = function (name, range) {
        return inputs[name] = createVariable(name, range);
    };

    /**
     * Add a output variable
     * @param name
     * @param range
     * @returns {Variable}
     * @public
     */
    self.addOutput = function (name, range) {
        return outputs[name] = createVariable(name, range);
    };

    /**
     * @param name variable name
     * @returns {Variable}
     * @public
     */
    self.getVar = function (name) {
        if(!isDefined(name)) {
            throw new Error('variable \'' + name + '\' is not defined');
        }

        if(inputs.hasOwnProperty(name)) {
            return inputs[name];
        } else {
            return outputs[name];
        }
    };

}


/** Module Exports */
module.exports = function () {
    return new FIS();
};