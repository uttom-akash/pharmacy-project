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
var mysql_1 = __importDefault(require("mysql"));
var FilterSearch = /** @class */ (function (_super) {
    __extends(FilterSearch, _super);
    function FilterSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterSearch.prototype.handle = function (req, res) {
        var _a = req.body, category = _a.category, price = _a.price, brand = _a.brand, offset = _a.offset;
        console.log(req.body);
        brand = '^' + brand + '.*';
        if (!price)
            price = 100000;
        this.getDrugsbymoreCategory(category, price, brand, offset).then(function (DrugsList) { return res.json(DrugsList); });
    };
    FilterSearch.prototype.getDrugsbymoreCategory = function (category, price, brand, offset) {
        var selectPart = "select d.DRUG_ID,d.DRUG_NAME,d.IMAGE_SRC,d.PRICE,d.BRAND from Drugs d inner join DrugCategory dc1 using(DRUG_ID)";
        var wherePart = "where dc1.CATEGORY_ID=?";
        for (var i = 1; i < category.length; i++) {
            var selectConcat = " inner join DrugCategory dc" + (i + 1) + " using(DRUG_ID)";
            var whereConcat = " and dc" + (i + 1) + ".CATEGORY_ID=?";
            selectPart += selectConcat;
            wherePart += whereConcat;
        }
        var query = selectPart + "  " + wherePart + " and d.PRICE<" + mysql_1.default.escape(price) + " and d.BRAND regexp " + mysql_1.default.escape(brand) + "  limit " + mysql_1.default.escape(offset) + ",15";
        return this.pool.query(query, category).then(function (drugsList) { return drugsList; });
    };
    return FilterSearch;
}(RequestHandler_1.default));
exports.default = FilterSearch;
