/**
 * A variable
 * @param {string} name
 * @param {Array} range
 * @class
 */
function Variable(name, range) {
    var self = this;
    var val;
    var terms = [];

    range = typeof range !== 'undefined'? range : [0, 1];

    /**
     * clamps value to range of variable
     * @param {Number} value
     * @returns {Number}
     * @private
     * */
    function clamp(value) {
        if(value < range[0]) {
            return range[0];
        }

        if(value > range[1]) {
            return range[1]
        }

        return value;
    }

    /**
     * @param {Number} value
     * @public
     * @throws Error
     * */
    self.setValue = function (value) {
        if(typeof value !== 'Number') {
            throw new Error('value is not a number');
        }

        val = clamp(value);
    };

    /**
     * @public
     * @returns Number
     * */
    self.getValue = function () {
        return val;
    };

    /**
     *
     * @param name linguistic term
     * @param membershipFunction membership function
     * @param params membership function parameters
     */
    self.addTerm = function (name, membershipFunction, params) {
        if(terms.hasOwnProperty(name)) {
            throw new Error('term is already defined');
        }

        var term = new MembershipFunction(params, membershipFunction);
        terms[name] = terms;

        return term;
    };
}

Module.exports = function (name, range) {
    return new Variable(name, range);
};