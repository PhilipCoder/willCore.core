const assert = require('chai').assert;
const willCoreProxy = require("../proxies/willCore/willCoreProxy.js");
const defaultProxy = require("../proxies/default/defaultProxy.js");
const willCoreModule = require("../moduleContainer/willCoreModules.js");

describe('test-default-proxy-test', function () {
    before(function(){
        willCoreModule.assignables.testProxy = () => require("./mocks/testAssignableProxyAssignable.js");
    });
    it('default-proxy-test', function () {
        let proxy = willCoreProxy.new();
        proxy.defaultValues;
        assert(proxy.defaultValues instanceof defaultProxy, "An defaultProxy was not returned.");
    });

    it('default-get-assignables-test', function () {
        let proxy = willCoreProxy.new();
        proxy.defaultValues;
        proxy.defaultValues.someDefaultValue.testProxy = "Hello world";
        assert(proxy.defaultValues instanceof defaultProxy, "An defaultProxy was not returned.");
    });
})


