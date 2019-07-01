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
var GetCart = /** @class */ (function (_super) {
    __extends(GetCart, _super);
    function GetCart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetCart.prototype.handle = function (req, res) {
        var _this = this;
        var userID = req.body.userID;
        this.getDrugsID(userID).then(function (drugsList) {
            var drugs = drugsList.map(function (drugID) { return _this.getDrug(drugID["DRUG_ID"]); });
            Promise.all(drugs).then(function (DRUGS_LIST) { return res.json({ MORE: DRUGS_LIST }); });
        });
    };
    GetCart.prototype.getDrugsID = function (userID) {
        var query = 'select DRUG_ID from Cart where USER_ID=?';
        return this.pool.query(query, [userID]);
    };
    GetCart.prototype.getDrug = function (DRUG_ID) {
        var query = "select PRICE,BRAND from Drugs where DRUG_ID=?";
        return this.pool.query(query, [DRUG_ID]).then(function (drug) {
            if (drug.length) {
                return {
                    PRICE: drug[0]['PRICE'],
                    BRAND: drug[0]['BRAND']
                };
            }
            else {
                return {};
            }
        });
    };
    return GetCart;
}(RequestHandler_1.default));
exports.default = GetCart;
