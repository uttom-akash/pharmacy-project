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
var Increment = /** @class */ (function (_super) {
    __extends(Increment, _super);
    function Increment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Increment.prototype.handle = function (req, res) {
        var _this = this;
        var _a = req.body, drugID = _a.drugID, orderID = _a.orderID;
        var query = "update DrugStates set REMAIN_QTY=REMAIN_QTY+1 where DRUG_ID=?";
        this.pool.query(query, [drugID]).then(function (result) {
            _this.isExist(drugID, orderID).then(function (result) {
                query = "update OrderedDrugs set QUANTITY=QUANTITY-1 where ORDER_ID=? and DRUG_ID=?";
                _this.pool.query(query, [orderID, drugID]).then(function (result) { return res.json({ result: true }); });
            });
        });
    };
    Increment.prototype.isExist = function (drugID, orderID) {
        var _this = this;
        var query = "select count(*) as cnt  from OrderedDrugs where ORDER_ID=? and DRUG_ID=?";
        return this.pool.query(query, [orderID, drugID]).then(function (result) {
            if (result[0]['cnt'] <= 0) {
                query = "insert into OrderedDrugs(ORDER_ID,DRUG_ID) values(?,?)";
                return _this.pool.query(query, [orderID, drugID]);
            }
        });
    };
    return Increment;
}(RequestHandler_1.default));
exports.default = Increment;
