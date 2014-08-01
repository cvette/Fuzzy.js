var RuleStatement = require('./rule_statement');
var RuleExpression = require('./rule_expression');
var ActivatedMembershipFunction = require('./activated_membership_function');

function Rule(weight) {
    var self = this;
    var condition;
    var conclusion;
    var accomplishmentDegree = NaN;

    weight = typeof weight !== 'undefined'? weight : 1;

    self.getCondition = function () {
        return condition;
    };

    self.setCondition = function (newCondition) {
        condition = newCondition;
    };

    self.setConclusion = function (newConclusion) {
        conclusion = newConclusion;
    };

    /**
     * Aggregates all subconditions to a single degree of accomplishment
     * @param value
     * @returns {number}
     */
    self.aggregate = function (andMethod, orMethod) {
        if(condition instanceof RuleExpression) {
            accomplishmentDegree = condition.aggregate(andMethod, orMethod);
        } else if(condition instanceof RuleStatement) {
            accomplishmentDegree =  condition.evaluate();
        } else {
            throw new Error('condition has to be an instance of RuleExpression or RuleStatement');
        }

        return accomplishmentDegree;
    };

    self.activate = function (activationMethod) {

        for(var i = 0; i < conclusion; i++) {
            conclusion[i].activate(accomplishmentDegree, activationMethod);
        }
    };
}

module.exports =  Rule;