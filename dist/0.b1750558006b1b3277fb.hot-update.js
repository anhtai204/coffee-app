"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 30:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhuongThucThanhToanController = void 0;
const common_1 = __webpack_require__(6);
let PhuongThucThanhToanController = class PhuongThucThanhToanController {
    constructor(PhuongThucThanhToanService) {
        this.PhuongThucThanhToanService = PhuongThucThanhToanService;
    }
};
exports.PhuongThucThanhToanController = PhuongThucThanhToanController;
exports.PhuongThucThanhToanController = PhuongThucThanhToanController = __decorate([
    (0, common_1.Controller)('khuyenmai'),
    __metadata("design:paramtypes", [PhuongThucThanhToanController])
], PhuongThucThanhToanController);


/***/ }),

/***/ 13:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PhuongThucThanhToanEntity = void 0;
const product_entity_1 = __webpack_require__(12);
const typeorm_1 = __webpack_require__(14);
let PhuongThucThanhToanEntity = class PhuongThucThanhToanEntity extends typeorm_1.BaseEntity {
};
exports.PhuongThucThanhToanEntity = PhuongThucThanhToanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PhuongThucThanhToanEntity.prototype, "id_khuyen_mai", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PhuongThucThanhToanEntity.prototype, "phanTramKhuyenMai", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PhuongThucThanhToanEntity.prototype, "donHangToiThieu", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.ProductEntity, product => product.khuyenMai),
    __metadata("design:type", typeof (_a = typeof product_entity_1.ProductEntity !== "undefined" && product_entity_1.ProductEntity) === "function" ? _a : Object)
], PhuongThucThanhToanEntity.prototype, "product", void 0);
exports.PhuongThucThanhToanEntity = PhuongThucThanhToanEntity = __decorate([
    (0, typeorm_1.Entity)("khuyenmai")
], PhuongThucThanhToanEntity);


/***/ }),

/***/ 31:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhuongThucThanhToanService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const typeorm_2 = __webpack_require__(14);
const phuongthucthanhtoan_entity_1 = __webpack_require__(13);
let PhuongThucThanhToanService = class PhuongThucThanhToanService {
    constructor(khuyenMaiRepository) {
        this.khuyenMaiRepository = khuyenMaiRepository;
    }
};
exports.PhuongThucThanhToanService = PhuongThucThanhToanService;
exports.PhuongThucThanhToanService = PhuongThucThanhToanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(phuongthucthanhtoan_entity_1.PhuongThucThanhToanEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], PhuongThucThanhToanService);


/***/ }),

/***/ 39:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhuongThucThanhToanModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const phuongthucthanhtoan_entity_1 = __webpack_require__(13);
const phuongthucthanhtoan_controller_1 = __webpack_require__(30);
const phuongthucthanhtoan_service_1 = __webpack_require__(31);
let PhuongThucThanhToanModule = class PhuongThucThanhToanModule {
};
exports.PhuongThucThanhToanModule = PhuongThucThanhToanModule;
exports.PhuongThucThanhToanModule = PhuongThucThanhToanModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([phuongthucthanhtoan_entity_1.PhuongThucThanhToanEntity])
        ],
        controllers: [phuongthucthanhtoan_controller_1.PhuongThucThanhToanController],
        providers: [phuongthucthanhtoan_service_1.PhuongThucThanhToanService]
    })
], PhuongThucThanhToanModule);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2efc4a226a77ee84c86e")
/******/ })();
/******/ 
/******/ }
;