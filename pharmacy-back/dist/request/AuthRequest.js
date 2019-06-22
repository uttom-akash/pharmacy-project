"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Connection_1 = __importDefault(require("../database/Connection"));
var pool = Connection_1.default.getInstance();
var router = express_1.default.Router();
router.post('/register', function (req, res) {
    var _a = req.body, FirstName = _a.FirstName, LastName = _a.LastName, phoneNumber = _a.phoneNumber, password = _a.password;
    var qs = "insert into Users(FIRST_NAME,LAST_NAME,CONTACT_NUMBER,PASSWORD) values(?,?,?,?)";
    pool.query(qs, [FirstName, LastName, phoneNumber, password])
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
});
router.post("/login", function (req, res) {
    var _a = req.body, phoneNumber = _a.phoneNumber, password = _a.password;
    var query = "select FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER from Users where CONTACT_NUMBER=? and password=?";
    pool.query(query, [phoneNumber, password]).then(function (user) {
        if (user.length)
            res.json({ user: user[0] });
        else
            setTimeout(function () { return res.status(400).json({ error: "invalid credentails" }); }, 10000);
    }).catch(function (err) { return setTimeout(function () { return res.status(400).json({ error: err }); }, 10000); });
});
router.post("/fetch_user", function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var query = "select FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER from Users where CONTACT_NUMBER=?";
    pool.query(query, [phoneNumber]).then(function (user) {
        if (user.length)
            res.json({ user: user[0] });
        else
            setTimeout(function () { return res.status(400).json({ error: "invalid credentails" }); }, 10000);
    }).catch(function (err) { return setTimeout(function () { return res.status(400).json({ error: err }); }, 10000); });
});
exports.default = router;
