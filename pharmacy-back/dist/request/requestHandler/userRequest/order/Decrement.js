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
var Decrement = /** @class */ (function (_super) {
    __extends(Decrement, _super);
    function Decrement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Decrement.prototype.handle = function (req, res) {
        var drugID = req.body.drugID;
        var query = "update DrugStates set REMAIN_QTY=REMAIN_QTY-1 where DRUG_ID=?";
        this.pool.query(query, [drugID]).then(function (result) { return res.json({ result: 'ok' }); });
    };
    return Decrement;
}(RequestHandler_1.default));
exports.default = Decrement;
