"use strict";
// factory
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// auth
var Register_1 = __importDefault(require("./requestHandler/userRequest/authRequestsHandler/Register"));
var Login_1 = __importDefault(require("./requestHandler/userRequest/authRequestsHandler/Login"));
var FetchUser_1 = __importDefault(require("./requestHandler/userRequest/authRequestsHandler/FetchUser"));
// category
var CategoriesOverview_1 = __importDefault(require("./requestHandler/userRequest/categoryRequestsHandler/CategoriesOverview"));
var CategoryDrugs_1 = __importDefault(require("./requestHandler/userRequest/categoryRequestsHandler/CategoryDrugs"));
var Categories_1 = __importDefault(require("./requestHandler/userRequest/categoryRequestsHandler/Categories"));
// drug
var Drugs_1 = __importDefault(require("./requestHandler/userRequest/drugs/Drugs"));
// brand
var BrandOverview_1 = __importDefault(require("./requestHandler/userRequest/brand/BrandOverview"));
var BrandDrugs_1 = __importDefault(require("./requestHandler/userRequest/brand/BrandDrugs"));
var Brands_1 = __importDefault(require("./requestHandler/userRequest/brand/Brands"));
// filtering
var FilterSearch_1 = __importDefault(require("./requestHandler/userRequest/filtering/FilterSearch"));
// cart
var AddToCart_1 = __importDefault(require("./requestHandler/userRequest/cart/AddToCart"));
var GetCart_1 = __importDefault(require("./requestHandler/userRequest/cart/GetCart"));
var RemoveCart_1 = __importDefault(require("./requestHandler/userRequest/cart/RemoveCart"));
var Requests = /** @class */ (function () {
    function Requests() {
        this.router = express_1.default.Router();
    }
    Requests.prototype.getRouting = function () {
        // auth
        this.router.post('/register', function (req, res) { return new Register_1.default().handle(req, res); });
        this.router.post("/login", function (req, res) { return new Login_1.default().handle(req, res); });
        this.router.post("/fetch_user", function (req, res) { return new FetchUser_1.default().handle(req, res); });
        // Drugs
        this.router.post("/drug", function (req, res) { return new Drugs_1.default().handle(req, res); });
        // categories
        this.router.get("/categories_overview", function (req, res) { return new CategoriesOverview_1.default().handle(req, res); });
        this.router.post("/category_drugs", function (req, res) { return new CategoryDrugs_1.default().handle(req, res); });
        // Brands
        this.router.get("/brand_overview", function (req, res) { return new BrandOverview_1.default().handle(req, res); });
        this.router.post("/brand_drugs", function (req, res) { return new BrandDrugs_1.default().handle(req, res); });
        // Filter search
        this.router.post("/filter_search", function (req, res) { return new FilterSearch_1.default().handle(req, res); });
        this.router.get("/categories", function (req, res) { return new Categories_1.default().handle(req, res); });
        this.router.get("/brands", function (req, res) { return new Brands_1.default().handle(req, res); });
        // cart
        this.router.post('/add-cart', function (req, res) { return new AddToCart_1.default().handle(req, res); });
        this.router.post('/remove-cart', function (req, res) { return new RemoveCart_1.default().handle(req, res); });
        this.router.post('/get-cart', function (req, res) { return new GetCart_1.default().handle(req, res); });
    };
    Requests.prototype.getRouter = function () {
        return this.router;
    };
    return Requests;
}());
var request = new Requests();
request.getRouting();
exports.default = request.getRouter();
