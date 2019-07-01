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
var BrandDrugs = /** @class */ (function (_super) {
    __extends(BrandDrugs, _super);
    function BrandDrugs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrandDrugs.prototype.handle = function (req, res) {
        var _this = this;
        var _a = req.body, brand = _a.brand, offset = _a.offset;
        this.getDrug(brand, offset).then(function (drugsList) {
            _this.isMore(brand).then(function (cnt) { return res.json({ MORE: (offset + 15 < cnt['cnt'] ? true : false), DRUGS_LIST: drugsList }); });
        });
    };
    BrandDrugs.prototype.isMore = function (brand) {
        var query = "select count(*) as cnt from Drugs where BRAND=?";
        return this.pool.query(query, brand).then(function (cnt) { return cnt[0]; });
    };
    BrandDrugs.prototype.getDrug = function (brand, offset) {
        var query = "select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where BRAND=? limit ?,15";
        return this.pool.query(query, [brand, offset]).then(function (drugslist) { return drugslist; });
    };
    return BrandDrugs;
}(RequestHandler_1.default));
exports.default = BrandDrugs;
