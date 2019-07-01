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
        var userID = req.body.userID;
        console.log("having");
        var query = 'select d.DRUG_NAME,d.BRAND,d.PRICE from Drugs as d inner join Cart as c using(DRUG_ID)  where c.USER_ID=?';
        this.pool.query(query, [userID]).then(function (DRUGS_LIST) { return res.json(DRUGS_LIST); });
    };
    return GetCart;
}(RequestHandler_1.default));
exports.default = GetCart;
