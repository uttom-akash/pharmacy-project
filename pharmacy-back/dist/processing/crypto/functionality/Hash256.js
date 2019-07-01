"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sha256_1 = __importDefault(require("crypto-js/sha256"));
var Hash = /** @class */ (function () {
    function Hash() {
    }
    Hash.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    Hash.prototype.execute = function (text) {
        return sha256_1.default(text).toString();
    };
    return Hash;
}());
exports.default = Hash;
