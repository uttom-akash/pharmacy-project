"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var util_promisify_1 = __importDefault(require("util.promisify"));
var Mysql = /** @class */ (function () {
    function Mysql() {
        this.pool = mysql_1.default.createPool({
            host: "localhost",
            user: "root",
            password: "akash",
            database: "mydb",
            connectionLimit: 10
        });
        this.pool.query = util_promisify_1.default(this.pool.query);
    }
    Mysql.getInstance = function () {
        return this._intstance || (this._intstance = new this());
    };
    Mysql.prototype.query = function (query, params) {
        return this.pool.query(query, params);
    };
    return Mysql;
}());
exports.default = Mysql;
