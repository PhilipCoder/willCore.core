const willCoreModules = require("../proxies/moduleContainment/moduleProxyHandler.js");

const willCoreModuleInstance = willCoreModules.new();
willCoreModuleInstance.assignables = willCoreModules.new();

module.exports = willCoreModuleInstance;