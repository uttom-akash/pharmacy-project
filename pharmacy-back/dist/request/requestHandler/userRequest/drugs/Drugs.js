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
var Drugs = /** @class */ (function (_super) {
    __extends(Drugs, _super);
    function Drugs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Drugs.prototype.handle = function (req, res) {
        var drugID = req.body.drugID;
        this.getDrug(drugID).then(function (drug) { return res.json({ drug: drug }); }).catch(function (err) { return res.json({ error: err }); });
    };
    Drugs.prototype.getDrug = function (DRUG_ID) {
        var query = "select DRUG_ID,DRUG_NAME,BRAND_NAME,MENUFACTURER_ID,BRAND,DAR,PRICE,IMAGE_SRC from Drugs where DRUG_ID=?";
        return this.pool.query(query, [DRUG_ID]).then(function (drug) { return ({
            DRUG_ID: drug[0]['DRUG_ID'],
            DRUG_NAME: drug[0]['DRUG_NAME'],
            BRAND_NAME: drug[0]['BRAND_NAME'],
            MENUFACTURER: drug[0]['MENUFACTURER'],
            BRAND: drug[0]['BRAND'],
            DAR: drug[0]['DAR'],
            PRICE: drug[0]['PRICE'],
            IMAGE_SRC: drug[0]['IMAGE_SRC']
        }); });
    };
    return Drugs;
}(RequestHandler_1.default));
exports.default = Drugs;
