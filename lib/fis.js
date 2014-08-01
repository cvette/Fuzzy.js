var MembershipFunction = require('./membership_function');
var Variable = require('./variable');
var Rule = require('./rule');
var RuleBuilder = require('./rule_builder');

/**
 * @class
 * @requires Fuzzificator
 * @module FIS
 * @license MIT
 * */
function FIS(activationMethod, accumulationMethod, andMethod, orMethod) {
    var self = this;
    var inputs = []; //input variables
    var outputs = []; //output variables
    var rules = [];

    self.evaluate = function (value) {
        var values = [];
        for(var i = 0; i < rules.length; i++) {
            var truth = rules[i].aggregate(andMethod, orMethod);
            console.log('Truth for rule ' + i + ': ' + truth);

            var res = rules[i].activate(truth, activationMethod);

            values.push(res);
        }

        return accumulationMethod(values);
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

        return new Variable(name, range);
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

    /**
     *
     * @returns {Rule}
     */
    self.addRule = function (rule) {
        rules.push(rule);

        return rule;
    };

    /**
     *
     * @returns {RuleBuilder}
     */
    self.createRuleBuilder = function () {
        return new RuleBuilder(self);
    }
}


/** Module Exports */
module.exports = function (activationMethod, accumulationMethod, andMethod, orMethod) {
    return new FIS(activationMethod, accumulationMethod, andMethod, orMethod);
};