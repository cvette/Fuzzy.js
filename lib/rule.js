var RuleStatement = require('./rule_statement');
var RuleExpression = require('./rule_expression');

function Rule(weight) {
    var self = this;
    var condition;
    var conclusion;

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
    self.aggregate = function(value, andMethod, orMethod) {
        if(condition instanceof RuleExpression) {
            return condition.aggregate(value, andMethod, orMethod);
        } else if(condition instanceof RuleStatement) {
            return condition.evaluate(value);
        } else {
            throw new Error('condition has to be an instance of RuleExpression or RuleStatement');
        }
    };

    self.activate = function (value, truth, method) {
        truth = truth * weight;

        var variable = conclusion.getVar();
        var term = variable.term(conclusion.getTerm());

        var u = term.evaluate(value);

        return method(truth, u);
    }
}

module.exports = function () {
    return new Rule();
};