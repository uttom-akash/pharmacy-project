"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeStamp = /** @class */ (function () {
    function TimeStamp() {
        this.date = new Date();
    }
    TimeStamp.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    TimeStamp.prototype.timeStamp = function () {
        return this.date.getFullYear() + "-" + (this.date.getMonth() +
            1) + "-" + this.date.getDate() + " " + this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds();
    };
    TimeStamp.prototype.time = function () {
        return this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds();
    };
    TimeStamp.prototype.dateMonthYear = function () {
        return this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
    };
    return TimeStamp;
}());
exports.default = TimeStamp;
