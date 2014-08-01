/**
 *
 * @class
 * @module MembershipFunction
 * @param {string} term
 * @param {Array} params
 * @param {function} membershipFunction
 * @license MIT
 */
function MembershipFunction(params, membershipFunction) {
    var self = this;

    function checkInterface(membershipFunction) {
        if(membershipFunction.length !== 2) {
            throw new Error('memberhsip function needs to have exactly 2 parameters');
        }
    }

    checkInterface(membershipFunction);

    self.evaluate = function (value) {
        return membershipFunction(value, params);
    };
}


/** Module Exports */
module.exports = function (params, membershipFunction) {
    return new MembershipFunction(params, membershipFunction);
};