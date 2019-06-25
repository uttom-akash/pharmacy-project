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
var CategoriesOverview = /** @class */ (function (_super) {
    __extends(CategoriesOverview, _super);
    function CategoriesOverview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoriesOverview.prototype.handle = function (req, res) {
        var _this = this;
        this.getCategories().then(function (categoryList) {
            var drugs = categoryList.map(function (category) {
                return _this.getDrugsID(category["CATEGORY_ID"]).then(function (drugsIDList) {
                    var categoryDrugs = drugsIDList.map(function (drug_id) {
                        return _this.getDrug(drug_id['DRUG_ID']);
                    });
                    return Promise.all(categoryDrugs).then(function (categoryDrugsList) { return ({ CATEGORY: category["CATEGORY_NAME"], DRUGS: categoryDrugsList }); });
                });
            });
            Promise.all(drugs).then(function (DRUGS) { return res.json(DRUGS); });
        });
    };
    CategoriesOverview.prototype.getDrug = function (DRUG_ID) {
        var query = "select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where DRUG_ID=?";
        return this.pool.query(query, [DRUG_ID]).then(function (drug) {
            if (drug.length) {
                return {
                    DRUG_ID: drug[0]['DRUG_ID'],
                    DRUG_NAME: drug[0]['DRUG_NAME'],
                    IMAGE_SRC: drug[0]['IMAGE_SRC'],
                    PRICE: drug[0]['PRICE']
                };
            }
            else {
                return {};
            }
        });
    };
    CategoriesOverview.prototype.getDrugsID = function (category) {
        var query = "select DRUG_ID from DrugCategory where CATEGORY_ID=? limit 5";
        return this.pool.query(query, [category]);
    };
    CategoriesOverview.prototype.getCategories = function () {
        var query = "select CATEGORY_ID,CATEGORY_NAME from Category";
        return this.pool.query(query, []);
    };
    return CategoriesOverview;
}(RequestHandler_1.default));
exports.default = CategoriesOverview;
