var Rule = require('./rule');
var RuleStatement = require('./rule_statement');
var Conclusion = require('./rule_statement');
var RuleExpression = require('./rule_expression');

function RuleBuilder(fis) {
    var self = this;
    var condition;
    var conclusion = [];
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


    self.then = function (varName, termName) {
        var variable = fis.getVar(varName);
        var concl = new Conclusion(variable, termName);

        conclusion.push(concl);

        return self;
    };

    self.if = function (varName) {
        var variable = fis.getVar(varName);
        condition = new RuleStatement(variable);

        return self;
    };

    self.is = function (term) {

        if(condition instanceof RuleExpression) {
            condition.getB().setTerm(term);
        } else if(condition instanceof RuleStatement) {
            condition.setTerm(term);
        } else {
            throw new Error('condition has to be an instance of RuleExpression or RuleStatement');
        }

        return self;
    };

    self.isNot = function (term) {

        if(condition instanceof RuleExpression) {
            condition.getB().setTerm(term);
            condition.getB().setNegated(true);
        } else if(condition instanceof RuleStatement) {
            condition.setTerm(term);
            condition.setNegated(true);
        } else {
            throw new Error('condition has to be an instance of RuleExpression or RuleStatement');
        }

        return self;
    };

    self.create = function () {
        fis.addRule(self.getRule());
    };
}

module.exports = function (fis) {
    return new RuleBuilder(fis);
};