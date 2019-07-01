"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = __importDefault(require("../../RequestHandler"));
var Brands = /** @class */ (function (_super) {
    __extends(Brands, _super);
    function Brands() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Brands.prototype.handle = function (req, res) {
        this.getBrandsName().then(function (brandsList) { return res.json(brandsList); });
    };
    Brands.prototype.getBrandsName = function () {
        var query = "select distinct BRAND from Drugs";
        return this.pool.query(query, []).then(function (brandsList) { return brandsList; });
    };
    return Brands;
}(RequestHandler_1.default));
exports.default = Brands;
