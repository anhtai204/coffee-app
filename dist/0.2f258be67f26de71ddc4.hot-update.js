"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

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

/***/ 30:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const rate_module_1 = __webpack_require__(36);
const khuyenmai_entity_1 = __webpack_require__(13);
const khuyenmai_controller_1 = __webpack_require__(31);
const khuyenmai_service_1 = __webpack_require__(32);
let KhuyenMaiModule = class KhuyenMaiModule {
};
exports.KhuyenMaiModule = KhuyenMaiModule;
exports.KhuyenMaiModule = KhuyenMaiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([khuyenmai_entity_1.KhuyenMaiEntity]),
            rate_module_1.RateModule
        ],
        controllers: [khuyenmai_controller_1.KhuyenMaiController],
        providers: [khuyenmai_service_1.KhuyenMaiService]
    })
], KhuyenMaiModule);


/***/ }),

/***/ 32:
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
exports.KhuyenMaiService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const typeorm_2 = __webpack_require__(14);
let KhuyenMaiService = class KhuyenMaiService {
    constructor(khuyenMaiRepository) {
        this.khuyenMaiRepository = khuyenMaiRepository;
    }
};
exports.KhuyenMaiService = KhuyenMaiService;
exports.KhuyenMaiService = KhuyenMaiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(KhuyenMaiEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], KhuyenMaiService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6af4b49b683c062b568c")
/******/ })();
/******/ 
/******/ }
;