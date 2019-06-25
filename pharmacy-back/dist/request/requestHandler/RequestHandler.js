"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = __importDefault(require("../../database/Connection"));
var RequestHandler = /** @class */ (function () {
    function RequestHandler() {
        this.pool = Connection_1.default.getInstance();
    }
    return RequestHandler;
}());
exports.default = RequestHandler;
