const assignable  = require('../../assignable/assignable.js');
const willCoreProxy = require("../../proxies/willCore/willCoreProxy.js");

class testAssingableObj extends assignable {
    constructor() {
        super({ string: 3, object: 1 }, willCoreProxy);
    }
    completionResult() {
        return this.bindedValues;
    }
    completed() {
    }
}

module.exports = testAssingableObj;