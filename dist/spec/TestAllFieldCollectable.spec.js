"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldCollectable_1 = require("../src/AllFieldCollectable");
var jasts_1 = require("jasts");
describe("Test All Field Collectable", function () {
    var SomeClass = /** @class */ (function () {
        function SomeClass(someInput, someOtherInput) {
            if (someInput === void 0) { someInput = 20; }
            if (someOtherInput === void 0) { someOtherInput = "blah"; }
            this.someField = someInput;
            this.someOtherField = someOtherInput;
        }
        return SomeClass;
    }());
    it("Test comparing undefined number", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two undefined", c.equals(undefined, undefined));
        jasts_1.TestBoolean.false("Testing undefined to null", c.equals(undefined, null));
        jasts_1.TestBoolean.false("Testing undefined to value", c.equals(undefined, 11111));
        jasts_1.TestBoolean.false("Testing null to undefined", c.equals(null, undefined));
        jasts_1.TestBoolean.false("Testing value to undefined", c.equals(11111, undefined));
    });
    it("Test comparing null number", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two null", c.equals(null, null));
        jasts_1.TestBoolean.false("Testing null to undefined", c.equals(null, undefined));
        jasts_1.TestBoolean.false("Testing null to value", c.equals(null, 11111));
        jasts_1.TestBoolean.false("Testing undefined to null", c.equals(undefined, null));
        jasts_1.TestBoolean.false("Testing value to null", c.equals(11111, null));
    });
    it("Test comparing a valid number", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two same valid numbers", c.equals(22222, 22222));
        jasts_1.TestBoolean.false("Testing two different valid numbers", c.equals(11111, 22222));
        jasts_1.TestBoolean.false("Testing value to undefined", c.equals(11111, undefined));
        jasts_1.TestBoolean.false("Testing value to null", c.equals(11111, null));
        jasts_1.TestBoolean.false("Testing undefined to value", c.equals(undefined, 11111));
        jasts_1.TestBoolean.false("Testing null to value", c.equals(null, 11111));
    });
    it("Test comparing undefined string", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two undefined", c.equals(undefined, undefined));
        jasts_1.TestBoolean.false("Testing undefined to null", c.equals(undefined, null));
        jasts_1.TestBoolean.false("Testing undefined to value", c.equals(undefined, "blah"));
        jasts_1.TestBoolean.false("Testing null to undefined", c.equals(null, undefined));
        jasts_1.TestBoolean.false("Testing value to undefined", c.equals("blah", undefined));
    });
    it("Test comparing null string", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two null", c.equals(null, null));
        jasts_1.TestBoolean.false("Testing null to undefined", c.equals(null, undefined));
        jasts_1.TestBoolean.false("Testing null to value", c.equals(null, "blah"));
        jasts_1.TestBoolean.false("Testing undefined to null", c.equals(undefined, null));
        jasts_1.TestBoolean.false("Testing value to null", c.equals("blah", null));
    });
    it("Test comparing a valid string", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two same valid strings", c.equals("another", "another"));
        jasts_1.TestBoolean.false("Testing two different valid strings", c.equals("blah", "another"));
        jasts_1.TestBoolean.false("Testing value to undefined", c.equals("blah", undefined));
        jasts_1.TestBoolean.false("Testing value to null", c.equals("blah", null));
        jasts_1.TestBoolean.false("Testing undefined to value", c.equals(undefined, "blah"));
        jasts_1.TestBoolean.false("Testing null to value", c.equals(null, "blah"));
    });
    it("Test comparing undefined object", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two undefined", c.equals(undefined, undefined));
        jasts_1.TestBoolean.false("Testing undefined to null", c.equals(undefined, null));
        jasts_1.TestBoolean.false("Testing undefined to value", c.equals(undefined, new SomeClass()));
        jasts_1.TestBoolean.false("Testing null to undefined", c.equals(null, undefined));
        jasts_1.TestBoolean.false("Testing value to undefined", c.equals(new SomeClass(), undefined));
    });
    it("Test comparing null object", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two null", c.equals(null, null));
        jasts_1.TestBoolean.false("Testing null to undefined", c.equals(null, undefined));
        jasts_1.TestBoolean.false("Testing null to value", c.equals(null, new SomeClass()));
        jasts_1.TestBoolean.false("Testing undefined to null", c.equals(undefined, null));
        jasts_1.TestBoolean.false("Testing value to null", c.equals(new SomeClass(), null));
    });
    it("Test comparing a valid object", function () {
        var c = new AllFieldCollectable_1.AllFieldCollectable();
        jasts_1.TestBoolean.true("Testing two same valid SomeClass", c.equals(new SomeClass(12345, "Another"), new SomeClass(12345, "Another")));
        jasts_1.TestBoolean.false("Testing two different valid SomeClass", c.equals(new SomeClass(), new SomeClass(12345, "Another")));
        jasts_1.TestBoolean.false("Testing value to undefined", c.equals(new SomeClass(), undefined));
        jasts_1.TestBoolean.false("Testing value to null", c.equals(new SomeClass(), null));
        jasts_1.TestBoolean.false("Testing undefined to value", c.equals(undefined, new SomeClass()));
        jasts_1.TestBoolean.false("Testing null to value", c.equals(null, new SomeClass()));
    });
});
