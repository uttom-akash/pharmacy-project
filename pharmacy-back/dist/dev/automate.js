"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Connection_1 = __importDefault(require("../database/Connection"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var pool = Connection_1.default.getInstance();
var router = express_1.default.Router();
router.get('/cat', function (req, res) {
    var cat = fs_1.default.readFileSync(path_1.default.join(__dirname, "catagories.json"), "utf8");
    var jcat = JSON.parse(cat);
    var length = jcat["category"].length;
    for (var i = 0; i < length; i++) {
        var q = "insert into Category(CATEGORY_NAME) values(?)";
        var value = jcat["category"][i];
        pool.query(q, [value])
            .then(function (result) { return console.log("ok"); })
            .catch(function (err) { if (err)
            throw err; });
    }
    res.send("ok");
});
router.get("/drug", function (req, res) {
    var data = fs_1.default.readFileSync(path_1.default.join(__dirname, "drugs.json"), "utf8");
    var jdata = JSON.parse(data);
    var drug = jdata["drugs"];
    var length = drug.length;
    for (var i = 0; i < length; i++) {
        var q = "insert into Drugs(DRUG_NAME,BRAND_NAME,BRAND,DAR,PRICE,IMAGE_SRC) values(?,?,?,?,?,?)";
        pool.query(q, [drug[i].title, drug[i]["brand name"], drug[i].brand, drug[i].DAR, drug[i].price, drug[i].image_src])
            .then(function (result) { return console.log("ok"); })
            .catch(function (err) { if (err)
            throw err; });
    }
    res.send("ok");
});
router.get("/drugc", function (req, res) {
    var data = fs_1.default.readFileSync(path_1.default.join(__dirname, "drugs.json"), "utf8");
    var jdata = JSON.parse(data);
    var drug = jdata["drugs"];
    var length = drug.length;
    var _loop_1 = function (i) {
        var cat = drug[i]["categories"];
        var clength = cat.length;
        var dname = drug[i]["title"];
        pool.query("select DRUG_ID from Drugs where DRUG_NAME=?", [dname]).then(function (dres) { if (dres.length > 0)
            return dres[0]['DRUG_ID']; }).then(function (did) {
            for (var j = 0; j < clength; j++) {
                var categ = cat[j];
                pool.query("select CATEGORY_ID from Category where CATEGORY_NAME=?", [categ]).then(function (res) { return res[0]["CATEGORY_ID"]; }).then(function (cid) {
                    pool.query("insert into DrugCategory values(?,?)", [did, cid]).then(function (res) { return console.log(res); });
                });
            }
        });
    };
    for (var i = 0; i < length; i++) {
        _loop_1(i);
    }
    res.send("ok");
});
exports.default = router;
