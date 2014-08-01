var RuleStatement = require('./rule_statement');
var ActivatedMembershipFunction = require('./activated_membership_function');

function Conclusion(variable, term, negated) {
    var self = this;
    var activatedTerm;

    self.activate = function (accomplishmentDegree, activationMethod) {
        activatedTerm = new ActivatedMembershipFunction(accomplishmentDegree, activationMethod);
    };

    self.getActivatedTerm = function () {
        return activatedTerm;
    }
}

Conclusion.prototype = new RuleStatement();


module.exports = Conclusion;