const defaultProxyHandler = require("./testAssignableProxyHandler.js");
const baseProxy = require("../../proxies/base/baseProxy.js");
/**
 * Proxy class for the main intermediate assignable instanciation.
 */
class testAssignableProxy extends baseProxy{
    constructor(){
        super();
    }
   /**
    * Factory method.
    * @param {Proxy} parentProxy 
    * @param {String} parentProperty 
    */
    static new(parentProxy, parentProperty){
        return new Proxy(new testAssignableProxy(), new defaultProxyHandler(parentProxy,parentProperty));
    }
}

module.exports = testAssignableProxy;