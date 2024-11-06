"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 39:
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
const khuyenmai_entity_1 = __webpack_require__(13);
const khuyenmai_service_1 = __webpack_require__(40);
const khuyenmai_controller_1 = __webpack_require__(41);
let KhuyenMaiModule = class KhuyenMaiModule {
};
exports.KhuyenMaiModule = KhuyenMaiModule;
exports.KhuyenMaiModule = KhuyenMaiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([khuyenmai_entity_1.KhuyenMaiEntity]),
            KhuyenMaiModule
        ],
        controllers: [khuyenmai_controller_1.KhuyenMaiController],
        providers: [khuyenmai_service_1.KhuyenMaiService]
    })
], KhuyenMaiModule);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("015f1d1701b7dd37d8ca")
/******/ })();
/******/ 
/******/ }
;