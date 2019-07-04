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
var IsAvailable_1 = __importDefault(require("./requestHandler/userRequest/sync/IsAvailable"));
// 
var Increment_1 = __importDefault(require("./requestHandler/userRequest/sync/Increment"));
var Decrement_1 = __importDefault(require("./requestHandler/userRequest/sync/Decrement"));
// 
var NewOrderInitialize_1 = __importDefault(require("./requestHandler/userRequest/order/NewOrderInitialize"));
var CancelOrder_1 = __importDefault(require("./requestHandler/userRequest/order/CancelOrder"));
var ConfirmOrder_1 = __importDefault(require("./requestHandler/userRequest/order/ConfirmOrder"));
// Order
var CurrentOrder_1 = __importDefault(require("./requestHandler/userRequest/order/CurrentOrder"));
var PastOrder_1 = __importDefault(require("./requestHandler/userRequest/order/PastOrder"));
var OrderRecieved_1 = __importDefault(require("./requestHandler/userRequest/order/OrderRecieved"));
var OrderDetails_1 = __importDefault(require("./requestHandler/userRequest/order/OrderDetails"));
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
        this.router.post('/is-available', function (req, res) { return new IsAvailable_1.default().handle(req, res); });
        this.router.post('/increment', function (req, res) { return new Increment_1.default().handle(req, res); });
        this.router.post('/decrement', function (req, res) { return new Decrement_1.default().handle(req, res); });
        this.router.post('/new-order-init', function (req, res) { return new NewOrderInitialize_1.default().handle(req, res); });
        this.router.post('/cancel-order', function (req, res) { return new CancelOrder_1.default().handle(req, res); });
        this.router.post('/confirm-order', function (req, res) { return new ConfirmOrder_1.default().handle(req, res); });
        this.router.post('/current-order', function (req, res) { return new CurrentOrder_1.default().handle(req, res); });
        this.router.post('/past-order', function (req, res) { return new PastOrder_1.default().handle(req, res); });
        this.router.post('/order-recieved', function (req, res) { return new OrderRecieved_1.default().handle(req, res); });
        this.router.post('/order-details', function (req, res) { return new OrderDetails_1.default().handle(req, res); });
    };
    Requests.prototype.getRouter = function () {
        return this.router;
    };
    return Requests;
}());
var request = new Requests();
request.getRouting();
exports.default = request.getRouter();
