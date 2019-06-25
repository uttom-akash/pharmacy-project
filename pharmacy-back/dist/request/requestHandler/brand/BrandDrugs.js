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
var RequestHandler_1 = __importDefault(require("../RequestHandler"));
var BrandDrugs = /** @class */ (function (_super) {
    __extends(BrandDrugs, _super);
    function BrandDrugs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrandDrugs.prototype.handle = function (req, res) {
        var BRAND = req.body.BRAND;
        this.getDrug(BRAND).then(function (drugsList) { return res.json(drugsList); });
    };
    BrandDrugs.prototype.getDrug = function (BRAND) {
        var query = "select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where BRAND=? limit 30";
        return this.pool.query(query, [BRAND]).then(function (drugslist) { return drugslist; });
    };
    return BrandDrugs;
}(RequestHandler_1.default));
exports.default = BrandDrugs;
