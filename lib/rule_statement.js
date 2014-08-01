
function RuleStatement(variable, term, negated) {
    var self = this;
    negated = typeof negated !== 'undefined'? negated : false;

    self.evaluate = function () {
        var mf = variable.term(term);
        var dom = mf.evaluate(variable.getValue());

        if(negated) {
            dom = 1 - dom;
        }

        console.log('dom for term ' + term + ': ' + dom);

        return dom;
    };

    self.isNegated = function() {
        return negated;
    };

    self.getVar = function() {
        return variable;
    };

    self.getTerm = function () {
        return term;
    };

    self.setTerm = function (termName) {
        term = termName;
    };

    self.setNegated = function (newNegated) {
        negated = newNegated;
    };
}

module.exports = RuleStatement;