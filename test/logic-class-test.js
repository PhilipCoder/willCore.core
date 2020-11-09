const assert = require('chai').assert;
const logicClass = require("../proxies/logicClass/logicClass.js");

class _baseLogic {
    constructor() {

    }
}

var handler = {
    construct: (target, args) => {
        return logicClass.new(args[0]);
    }
};

var baseLogic = new Proxy(_baseLogic, handler);

describe('logic-class-test', function () {

    it('constructing', async function () {
        class testClass extends baseLogic {
            constructor() {
                super(testClass);
            }

            output(value){
                return "Value is not provided!";
            }
        }

        var aa = new testClass();
    });

    it('basic-overloading', async function () {
        let logicInstance = logicClass.new();

        logicInstance.validate = [async (a, b) => {
            return `Value A (${a}) is Bigger Then B (${b})`;
        }, async (a, b) => a > b];

        logicInstance.validate = [async (a, b) => {
            return `Value A (${a}) is Smaller Then B (${b})`;
        }, async (a, b) => a < b];

        let resultA = await logicInstance.validate(2, 3);
        let resultB = await logicInstance.validate(3, 2);
        let resultC = await logicInstance.validate(2, 2);

        assert(resultA === "Value A (2) is Smaller Then B (3)", "Incorrect function result");
        assert(resultB === "Value A (3) is Bigger Then B (2)", "Incorrect function result");
        assert(resultC === undefined, "Incorrect function result");

    });

    it('this-overloading', async function () {
        let logicInstance = logicClass.new();
        logicInstance.name = "John";

        logicInstance.validate = [async function (a, b) {
            return `Value A (${a}) is Bigger Then B (${b}) ${this.name}`;
        }, async (a, b) => a > b];

        logicInstance.validate = async function (a, b) {
            return `Value A (${a}) is Smaller Then B (${b}) ${this.name}`;
        };

        logicInstance.validate = async (a, b) => a < b;

        let resultA = await logicInstance.validate(2, 3);
        let resultB = await logicInstance.validate(3, 2);
        let resultC = await logicInstance.validate(2, 2);

        assert(resultA === "Value A (2) is Smaller Then B (3) John", "Incorrect function result");
        assert(resultB === "Value A (3) is Bigger Then B (2) John", "Incorrect function result");
        assert(resultC === undefined, "Incorrect function result");

    });

    it('children', async function () {
        let logicInstance = logicClass.new();
        logicInstance.name = "John";

        logicInstance.output = [
            (value) => `Value is unsupported!`,
            (value) => value !== undefined];

        logicInstance.output = [
            (value) => `Value is not provided!`,
            (value) => value === undefined
        ];

        logicInstance.output.outputString = [
            (value) => `Value is a string: ${value}!`,
            (value) => typeof value === "string"
        ];

        logicInstance.output.outputNumber = [
            (value) => `Value is a number: ${value}!`,
            (value) => typeof value === "number"
        ];

        logicInstance.output.outputNumber = [
            (value) => `Value is an array: ${value.join(',')}!`,
            (value) => Array.isArray(value)
        ];

        let resultA = await logicInstance.output("one");
        let resultB = await logicInstance.output(2);
        let resultC = await logicInstance.output([5, 6]);
        let resultD = await logicInstance.output(true);
        let resultE = await logicInstance.output();

        assert(resultA === "Value is a string: one!", "Incorrect function result");
        assert(resultB === 'Value is a number: 2!', "Incorrect function result");
        assert(resultC === 'Value is an array: 5,6!', "Incorrect function result");
        assert(resultD === 'Value is unsupported!', "Incorrect function result");
        assert(resultE === 'Value is not provided!', "Incorrect function result");
    });

    it('noOverloading', async function () {
        let logicInstance = logicClass.new();
        logicInstance.name = "John";

        logicInstance.output = async (value) => `Output value ${value}`,
            logicInstance.input = (value) => `Input value ${value}`,

            logicInstance.condition = [
                (value) => `Value is not provided!`,
                (value) => value === undefined
            ];


        let resultA = await logicInstance.output("one");
        let resultB = await logicInstance.input(2);
        let resultC = await logicInstance.condition();

        assert(resultA === "Output value one", "Incorrect function result");
        assert(resultB === 'Input value 2', "Incorrect function result");
        assert(resultC === 'Value is not provided!', "Incorrect function result");
    });
})