"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AuthRequest_1 = __importDefault(require("./request/AuthRequest"));
var automate_1 = __importDefault(require("./dev/automate"));
var app = express_1.default();
var port = 8081;
app.use(express_1.default.json());
app.use('/api', AuthRequest_1.default);
// dev insert
app.use('/auto', automate_1.default);
app.get('/', function (req, res) {
    res.send("Hello,backend");
});
app.listen(port, function () { return console.log("server is listening on " + port); });
