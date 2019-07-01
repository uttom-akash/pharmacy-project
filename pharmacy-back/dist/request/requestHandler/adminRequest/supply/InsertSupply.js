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
var InsertSupply = /** @class */ (function (_super) {
    __extends(InsertSupply, _super);
    function InsertSupply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsertSupply.prototype.handle = function (req, res) {
        var _a = req.body, drugID = _a.drugID, date = _a.date, quantity = _a.quantity, supplierPrice = _a.supplierPrice, supplierID = _a.supplierID;
        var query = "insert into Supply(DRUG_ID,SUPPLY_DATE,QUANTITY,SUPPLIER_PRICE,SUPPLIER_ID) values(?,?,?,?,?)";
        this.pool.query(query, [drugID, date, quantity, supplierPrice, supplierID])
            .then(function (result) { return res.json({ result: result }); })
            .catch(function (err) { return res.json({ error: err }); });
    };
    return InsertSupply;
}(RequestHandler_1.default));
exports.default = InsertSupply;
