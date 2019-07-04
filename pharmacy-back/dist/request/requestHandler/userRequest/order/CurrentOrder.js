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
var CurrentOrder = /** @class */ (function (_super) {
    __extends(CurrentOrder, _super);
    function CurrentOrder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurrentOrder.prototype.handle = function (req, res) {
        var userID = req.body.userID;
        var query = "select ORDER_ID,DATE_FORMAT(NOW(), '%d-%m-%Y') as DATE,TIME,TOTAL_PRICE,REC_STATUS from Orders where REC_STATUS=? and USER_ID=?";
        this.pool.query(query, [0, userID]).then(function (ORDERS) { return res.json({ ORDERS: ORDERS }); });
    };
    return CurrentOrder;
}(RequestHandler_1.default));
exports.default = CurrentOrder;
