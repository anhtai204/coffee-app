"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 41:
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KhuyenMaiController = void 0;
const common_1 = __webpack_require__(6);
const globalClass_1 = __webpack_require__(21);
const gobalEnum_1 = __webpack_require__(22);
const khuyenmai_service_1 = __webpack_require__(40);
const khuyenmai_entity_1 = __webpack_require__(13);
let KhuyenMaiController = class KhuyenMaiController {
    constructor(KhuyenMaiService) {
        this.KhuyenMaiService = KhuyenMaiService;
    }
    async createKhuyenMai(khuyenMai) {
        try {
            console.log(khuyenMai);
            const saveKhuyenMai = await this.KhuyenMaiService.save(khuyenMai);
            return new globalClass_1.ResponseData(saveKhuyenMai, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getAllKhuyenMai() {
        try {
            const khuyenMais = await this.KhuyenMaiService.getKhuyenMai();
            return new globalClass_1.ResponseData(khuyenMais, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
};
exports.KhuyenMaiController = KhuyenMaiController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof khuyenmai_entity_1.KhuyenMaiEntity !== "undefined" && khuyenmai_entity_1.KhuyenMaiEntity) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], KhuyenMaiController.prototype, "createKhuyenMai", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], KhuyenMaiController.prototype, "getAllKhuyenMai", null);
exports.KhuyenMaiController = KhuyenMaiController = __decorate([
    (0, common_1.Controller)('khuyenmai'),
    __metadata("design:paramtypes", [typeof (_a = typeof khuyenmai_service_1.KhuyenMaiService !== "undefined" && khuyenmai_service_1.KhuyenMaiService) === "function" ? _a : Object])
], KhuyenMaiController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1f3ef90ce67c59c13481")
/******/ })();
/******/ 
/******/ }
;