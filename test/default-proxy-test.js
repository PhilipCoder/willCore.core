const assert = require('chai').assert;
const willCoreProxy = require("../proxies/willCore/willCoreProxy.js");
const intermediateAssignableProxy = require("../proxies/intermediateAssignable/intermediateAssignableProxy.js");
const defaultProxy = require("../proxies/default/defaultProxy.js");

describe('test-default-proxy-test', function () {
    it('default-proxy-test', function () {
        let proxy = willCoreProxy.new();
        proxy.defaultValues;
        assert(proxy.defaultValues instanceof defaultProxy, "An defaultProxy was not returned.");
    });

    
})