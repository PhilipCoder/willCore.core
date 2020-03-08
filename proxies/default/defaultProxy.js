const defaultProxyHandler = require("./defaultProxyHandler.js");
const baseProxy = require("../base/baseProxy.js");
/**
 * Proxy class for the main intermediate assignable instanciation.
 */
class defaultProxy extends baseProxy{
    constructor(){
        super();
    }
   /**
    * Factory method.
    * @param {Proxy} parentProxy 
    * @param {String} parentProperty 
    */
    static new(parentProxy, parentProperty){
        return new Proxy(new defaultProxy(), new defaultProxyHandler(parentProxy,parentProperty));
    }
}

module.exports = defaultProxy;