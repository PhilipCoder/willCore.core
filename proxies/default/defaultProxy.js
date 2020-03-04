const defaultProxyHandler = require("./defaultProxyHandler.js");
/**
 * Proxy class for the main intermediate assignable instanciation.
 */
class defaultProxy{
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