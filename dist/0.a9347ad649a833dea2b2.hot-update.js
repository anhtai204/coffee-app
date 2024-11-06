exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 30:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KhuyenMaiModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const khuyenmai_entity_1 = __webpack_require__(13);
const khuyenmai_controller_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './khuyenmai.controller'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const khuyenmai_service_1 = __webpack_require__(32);
let KhuyenMaiModule = class KhuyenMaiModule {
};
exports.KhuyenMaiModule = KhuyenMaiModule;
exports.KhuyenMaiModule = KhuyenMaiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([khuyenmai_entity_1.KhuyenMaiEntity])
        ],
        controllers: [khuyenmai_controller_1.KhuyenMaiController],
        providers: [khuyenmai_service_1.KhuyenMaiService]
    })
], KhuyenMaiModule);


/***/ }),

/***/ 32:
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/ts-loader/index.js):\nError: ENOENT: no such file or directory, open 'C:\\Users\\Admin\\LearnNestjs\\coffee-app-manager\\src\\khuyenmai\\khuyenmai.service.ts'");

/***/ }),

/***/ 12:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductEntity = void 0;
const khuyenmai_entity_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/khuyenmai/khuyenmai.entity'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const product_topping_entity_1 = __webpack_require__(15);
const rate_entity_1 = __webpack_require__(11);
const theloai_entity_1 = __webpack_require__(17);
const typeorm_1 = __webpack_require__(14);
let ProductEntity = class ProductEntity extends typeorm_1.BaseEntity {
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "id_product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "tenSanPham", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "giaSanPham", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "khuyenmai_gia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => theloai_entity_1.TheLoaiEntity, theLoai => theLoai.products, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_theLoai' }),
    __metadata("design:type", typeof (_a = typeof theloai_entity_1.TheLoaiEntity !== "undefined" && theloai_entity_1.TheLoaiEntity) === "function" ? _a : Object)
], ProductEntity.prototype, "theLoai", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => khuyenmai_entity_1.KhuyenMaiEntity, khuyenMai => khuyenMai.product, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_khuyen_mai' }),
    __metadata("design:type", typeof (_b = typeof khuyenmai_entity_1.KhuyenMaiEntity !== "undefined" && khuyenmai_entity_1.KhuyenMaiEntity) === "function" ? _b : Object)
], ProductEntity.prototype, "khuyenMai", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_topping_entity_1.ProductToppingEntity, (productTopping) => productTopping.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "productToppings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rate_entity_1.RateEntity, rate => rate.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "rates", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)("product")
], ProductEntity);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("993e8f63d45ed7d2803d")
/******/ })();
/******/ 
/******/ }
;