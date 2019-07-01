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
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.handle = function (req, res) {
        var _a = req.body, phoneNumber = _a.phoneNumber, password = _a.password;
        var query = "select USER_ID,FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER from Users where CONTACT_NUMBER=? and password=?";
        var passwordHash = Hash256_1.default.getInstance().execute(password);
        this.pool.query(query, [phoneNumber, passwordHash]).then(function (user) {
            if (user.length)
                res.json({ user: user[0] });
            else
                setTimeout(function () { return res.status(400).json({ error: "invalid credentails" }); }, 10000);
        }).catch(function (err) { return setTimeout(function () { return res.status(400).json({ error: err }); }, 10000); });
    };
    return Login;
}(RequestHandler_1.default));
exports.default = Login;
