const assignable  = require('../../assignable/assignable.js');
const willCoreProxy = require("../../proxies/willCore/willCoreProxy.js");

class testAssingable extends assignable {
    constructor() {
        super({ string: 3 }, willCoreProxy);
        this.isCompletedAssignment = false;
        this.result = undefined;
    }
    completionResult() {
        return this.result;
    }
    completed() {
        this.isCompletedAssignment = true;
    }
}

module.exports = testAssingable;