"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RandomGenerator = /** @class */ (function () {
    function RandomGenerator() {
    }
    RandomGenerator.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    RandomGenerator.prototype.getNumber = function () {
        var mx = 1000000;
        var mn = 1000;
        var randomNumber = Math.floor(Math.random() * (mx - mn)) + mn;
        return randomNumber.toString();
    };
    return RandomGenerator;
}());
exports.default = RandomGenerator;
