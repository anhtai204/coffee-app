exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 5:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(6);
const app_controller_1 = __webpack_require__(7);
const app_service_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(10);
const user_module_1 = __webpack_require__(18);
const typeorm_2 = __webpack_require__(14);
const axios_1 = __webpack_require__(23);
const theloai_entity_1 = __webpack_require__(17);
const theloai_module_1 = __webpack_require__(24);
const topping_module_1 = __webpack_require__(27);
const topping_entity_1 = __webpack_require__(16);
const khuyenmai_entity_1 = __webpack_require__(13);
const khuyenmai_module_1 = __webpack_require__(30);
const product_entity_1 = __webpack_require__(12);
const product_module_1 = __webpack_require__(33);
const product_topping_entity_1 = __webpack_require__(15);
const product_topping_module_1 = __webpack_require__(39);
const rate_entity_1 = __webpack_require__(11);
const rate_module_1 = __webpack_require__(36);
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '0.0.0.0',
                port: 3306,
                username: 'root',
                password: '22042004',
                database: 'coffee_app',
                entities: [user_entity_1.UserEntity, theloai_entity_1.TheLoaiEntity, topping_entity_1.ToppingEntity, khuyenmai_entity_1.KhuyenMaiEntity, product_entity_1.ProductEntity, product_topping_entity_1.ProductToppingEntity, rate_entity_1.RateEntity],
                synchronize: false,
            }),
            axios_1.HttpModule,
            user_module_1.UsersModule,
            theloai_module_1.TheLoaiModule,
            topping_module_1.ToppingModule,
            khuyenmai_module_1.KhuyenMaiModule,
            product_module_1.ProductModule,
            product_topping_module_1.ProductToppingModule,
            rate_module_1.RateModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], AppModule);


/***/ }),

/***/ 30:
/***/ (() => {



/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("34959ee06494aea6cac5")
/******/ })();
/******/ 
/******/ }
;