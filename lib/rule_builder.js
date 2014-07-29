var Rule = require('./rule');
var RuleStatement = require('./rule_statement');
var RuleExpression = require('./rule_expression');

function RuleBuilder(fis) {
    var self = this;
    var condition;
    var conclusion;
    var weight;

    self.getCondition = function () {
        return condition;
    };

    self.getRule = function () {
        var rule = new Rule(weight);
        rule.setCondition(condition);
        rule.setConclusion(conclusion);
        return rule;
    };

    self.weight = function (newWeight) {
        weight = newWeight;

        return self;
    };

    self.or = function (varName) {
        var variable = fis.getVar(varName);
        var stmt = new RuleStatement(variable);
        condition = new RuleExpression(condition, stmt, 'or');

        return self;
    };

    self.and = function (varName) {
        var variable = fis.getVar(varName);
        var stmt = new RuleStatement(variable);
        condition = new RuleExpression(condition, stmt, 'and');

        return self;
    };


    self.then = function (varName, term) {
        var variable = fis.getVar(varName);
        conclusion = new RuleStatement(variable, term);

        return self;
    };

    self.if = function (varName) {
        var variable = fis.getVar(varName);
        condition = new RuleStatement(variable);

        return self;
    };

    self.is = function (term) {
        condition.setTerm(term);

        return self;
    };

    self.isNot = function (term) {
        condition.setTerm(term);
        condition.setNegated(true);

        return self;
    };
}

module.exports = function (fis) {
    return new RuleBuilder(fis);
};