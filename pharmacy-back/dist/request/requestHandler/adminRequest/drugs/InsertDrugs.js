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
var InsertDrugs = /** @class */ (function (_super) {
    __extends(InsertDrugs, _super);
    function InsertDrugs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsertDrugs.prototype.handle = function (req, res) {
        var _this = this;
        var _a = req.body, name = _a.name, brand_name = _a.brand_name, menufacturer = _a.menufacturer, brand = _a.brand, DAR = _a.DAR, price = _a.price, image_src = _a.image_src;
        var query = "insert into Drugs(DRUG_NAME,BRAND_NAME,MENUFACTURER_ID,BRAND,DAR,PRICE,IMAGE_SRC) values(?,?,?,?,?,?,?)";
        this.getMenufecturerID(menufacturer).then(function (menufacturer_id) {
            return _this.pool.query(query, [name, brand_name, menufacturer_id, brand, DAR, price, image_src])
                .then(function (result) { return res.json({ result: result }); })
                .catch(function (err) { if (err)
                throw err; });
        });
    };
    InsertDrugs.prototype.getMenufecturerID = function (menufacturer) {
        var query = "select MENUFACTURER_ID from Manufacturer where NAME=?";
        return this.pool.query(query, [menufacturer]).then(function (id) { return id[0]["MENUFACTURER_ID"]; });
    };
    return InsertDrugs;
}(RequestHandler_1.default));
exports.default = InsertDrugs;
