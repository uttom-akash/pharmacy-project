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
var CategoryDrugs = /** @class */ (function (_super) {
    __extends(CategoryDrugs, _super);
    function CategoryDrugs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryDrugs.prototype.handle = function (req, res) {
        var _this = this;
        var CATEGORY_ID = req.body.CATEGORY_ID;
        this.getDrugsID(CATEGORY_ID).then(function (drugsList) {
            var drugs = drugsList.map(function (drugID) { return _this.getDrug(drugID["DRUG_ID"]); });
            Promise.all(drugs).then(function (DRUGS_LIST) { return res.json({ DRUGS_LIST: DRUGS_LIST }); });
        });
    };
    CategoryDrugs.prototype.getDrugsID = function (CATEGORY_ID) {
        var query = "select DRUG_ID from DrugCategory where CATEGORY_ID=? limit 30";
        return this.pool.query(query, [CATEGORY_ID]);
    };
    CategoryDrugs.prototype.getDrug = function (DRUG_ID) {
        var query = "select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where DRUG_ID=?";
        return this.pool.query(query, [DRUG_ID]).then(function (drug) { return ({
            DRUG_ID: drug[0]['DRUG_ID'],
            DRUG_NAME: drug[0]['DRUG_NAME'],
            IMAGE_SRC: drug[0]['IMAGE_SRC'],
            PRICE: drug[0]['PRICE']
        }); });
    };
    return CategoryDrugs;
}(RequestHandler_1.default));
exports.default = CategoryDrugs;
