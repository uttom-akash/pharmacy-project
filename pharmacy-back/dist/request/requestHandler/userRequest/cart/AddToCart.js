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
var AddToCart = /** @class */ (function (_super) {
    __extends(AddToCart, _super);
    function AddToCart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddToCart.prototype.handle = function (req, res) {
        var _a = req.body, userID = _a.userID, drugID = _a.drugID;
        var query = 'insert into Cart values(?,?,?)';
        var date = TimeStamp_1.default.getInstance();
        this.pool.query(query, [userID, drugID, date.dateMonthYear()]).then(function (result) { return res.json({ result: 'ok' }); }).catch(function (err) { return res.status(450).json({ error: err }); });
    };
    return AddToCart;
}(RequestHandler_1.default));
exports.default = AddToCart;
