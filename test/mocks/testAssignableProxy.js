const defaultProxyHandler = require("./testAssignableProxyHandler.js");
const baseProxy = require("../../proxies/base/baseProxy.js");
/**
 * Proxy class for the main intermediate assignable instanciation.
 */
class testAssignableProxy extends baseProxy{
    constructor(assignable){
        super(assignable);
    }
   /**
    * Factory method.
    * @param {Proxy} parentProxy 
    * @param {String} parentProperty 
    */
    static new(parentProxy, parentProperty,assignable){
        return new Proxy(new testAssignableProxy(), new defaultProxyHandler(parentProxy,parentProperty,assignable));
    }
}

module.exports = testAssignableProxy;