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
var RequestHandler_1 = __importDefault(require("../RequestHandler"));
var Hash256_1 = __importDefault(require("../../../processing/crypto/functionality/Hash256"));
var RandomGenerator_1 = __importDefault(require("../../../processing/randomization/RandomGenerator"));
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Register.prototype.handle = function (req, res) {
        var _a = req.body, FirstName = _a.FirstName, LastName = _a.LastName, phoneNumber = _a.phoneNumber, password = _a.password;
        var qs = "insert into Users(USER_ID,FIRST_NAME,LAST_NAME,CONTACT_NUMBER,PASSWORD) values(?,?,?,?,?)";
        var userID = Hash256_1.default.getInstance().execute(RandomGenerator_1.default.getInstance().getNumber());
        var passwordhash = Hash256_1.default.getInstance().execute(password);
        this.pool.query(qs, [userID, FirstName, LastName, phoneNumber, passwordhash])
            .then(function (result) {
            return setTimeout(function () {
                res.json({ user: {
                        FIRST_NAME: FirstName,
                        LAST_NAME: LastName,
                        ADDRESS: "",
                        CONTACT_NUMBER: phoneNumber
                    } }), 10000;
            });
        })
            .catch(function (err) { return setTimeout(function () { return res.status(400).json({ error: err }); }, 10000); });
    };
    return Register;
}(RequestHandler_1.default));
exports.default = Register;
