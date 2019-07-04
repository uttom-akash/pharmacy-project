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
var CancelOrder = /** @class */ (function (_super) {
    __extends(CancelOrder, _super);
    function CancelOrder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CancelOrder.prototype.handle = function (req, res) {
        var _this = this;
        var orderID = req.body.orderID;
        this.drugIDs(orderID).then(function (drugs) {
            drugs.map(function (drug) { return _this.increment(drug['DRUG_ID'], drug['QUANTITY']); });
            res.json({ result: true });
        });
    };
    CancelOrder.prototype.drugIDs = function (orderID) {
        var query = "select DRUG_ID,QUANTITY from OrderedDrugs where  ORDER_ID=?";
        return this.pool.query(query, [orderID]);
    };
    CancelOrder.prototype.increment = function (drugID, inc) {
        var query = "update DrugStates set REMAIN_QTY=REMAIN_QTY+? where DRUG_ID=?";
        return this.pool.query(query, [inc, drugID]);
    };
    return CancelOrder;
}(RequestHandler_1.default));
exports.default = CancelOrder;
