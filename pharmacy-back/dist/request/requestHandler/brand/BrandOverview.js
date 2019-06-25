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
var BrandOverview = /** @class */ (function (_super) {
    __extends(BrandOverview, _super);
    function BrandOverview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrandOverview.prototype.handle = function (req, res) {
        var _this = this;
        this.getBrandsName().then(function (brandsList) {
            var drugs = brandsList.map(function (brand) {
                var brandedDrugs = _this.getDrugs(brand["BRAND"]);
                return Promise.all([brandedDrugs]).then(function (brandedDrugsList) { return ({ BRAND: brand["BRAND"], DRUGS: brandedDrugsList }); });
            });
            Promise.all(drugs).then(function (DRUGS) { return res.json(DRUGS); });
        });
    };
    BrandOverview.prototype.getBrandsName = function () {
        var query = "select distinct BRAND from Drugs";
        return this.pool.query(query, []).then(function (brandsList) { return brandsList; });
    };
    BrandOverview.prototype.getDrugs = function (brand) {
        var query = "select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE,BRAND from Drugs where BRAND=? limit 2";
        return this.pool.query(query, [brand]).then(function (drugs) {
            var brandDrugs = drugs.map(function (drug) { return ({
                DRUG_ID: drug['DRUG_ID'],
                DRUG_NAME: drug['DRUG_NAME'],
                IMAGE_SRC: drug['IMAGE_SRC'],
                PRICE: drug['PRICE'],
                BRAND: drug['BRAND']
            }); });
            return brandDrugs;
        });
    };
    return BrandOverview;
}(RequestHandler_1.default));
exports.default = BrandOverview;
