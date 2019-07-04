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
var TimeStamp_1 = __importDefault(require("../../../../processing/timestamp/TimeStamp"));
var ConfirmOrder = /** @class */ (function (_super) {
    __extends(ConfirmOrder, _super);
    function ConfirmOrder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfirmOrder.prototype.handle = function (req, res) {
        var _a = req.body, orderID = _a.orderID, totalPrice = _a.totalPrice;
        var timeStamp = TimeStamp_1.default.getInstance();
        var date = timeStamp.dateMonthYear();
        var time = timeStamp.time();
        var query = "update Orders set STATUS=?,TOTAL_PRICE=?,DATE=?,TIME=? where ORDER_ID=?";
        this.pool.query(query, [1, totalPrice, date, time, orderID]).then(function (result) { return res.json({ result: 'confirmed' }); });
    };
    return ConfirmOrder;
}(RequestHandler_1.default));
exports.default = ConfirmOrder;
