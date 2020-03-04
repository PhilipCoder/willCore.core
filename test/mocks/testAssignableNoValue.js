const assignable  = require('../../assignable/assignable.js');
const willCoreProxy = require("../../proxies/willCore/willCoreProxy.js");

class testAssingableNoValue extends assignable {
    constructor() {
        super({  }, willCoreProxy);
        this.isCompletedAssignment = false;
        this.result = "ProxyValueHere";
    }
    static get noValues(){
        return willCoreProxy;
    }
    completionResult() {
        return this.result;
    }
    completed() {
        this.isCompletedAssignment = true;
    }
}

module.exports = testAssingableNoValue;