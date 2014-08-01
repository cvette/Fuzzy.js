
function ActivatedMembershipFunction (accomplishmentDegree, membershipFunction, activationMethod) {
    var self = this;

    self.evaluate = function(x) {
        return activationMethod(accomplishmentDegree, membershipFunction.evaluate(x));
    };
}

module.exports = ActivatedMembershipFunction;