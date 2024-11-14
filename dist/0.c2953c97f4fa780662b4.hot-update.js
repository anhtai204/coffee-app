"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 33:
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const common_1 = __webpack_require__(6);
const globalClass_1 = __webpack_require__(19);
const gobalEnum_1 = __webpack_require__(20);
const product_service_1 = __webpack_require__(34);
const product_entity_1 = __webpack_require__(12);
const platform_express_1 = __webpack_require__(35);
const multer_1 = __webpack_require__(36);
const path_1 = __webpack_require__(37);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async uploadFile(file, id_product) {
        const updatedProduct = await this.productService.updateProductLogo(id_product, file.filename);
        return new globalClass_1.ResponseData(updatedProduct, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
    }
    async createProduct(product) {
        try {
            console.log(product);
            const saveProduct = await this.productService.save(product);
            return new globalClass_1.ResponseData(saveProduct, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getAllProduct() {
        try {
            const products = await this.productService.getProducts();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async deleteProductById(id_product) {
        const result = await this.productService.deleteProduct(id_product);
        if (result) {
            return new globalClass_1.ResponseData(result, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        else {
            return new globalClass_1.ResponseData(result, gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async suaProduct(id_product, new_product) {
        try {
            const product = await this.productService.updateProduct(id_product, new_product);
            return new globalClass_1.ResponseData(product, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            console.error('Error updating product:', error);
            return new globalClass_1.ResponseData(null, gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getProductById(id_product) {
        try {
            const product = await this.productService.getProductById(id_product);
            return new globalClass_1.ResponseData(product, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData(null, gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getOthersProduct() {
        try {
            const products = await this.productService.getProductOthers();
            console.log(products);
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getOtherSortCost() {
        try {
            const products = await this.productService.getOthersFilterGia();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getOthersSortSale() {
        try {
            const products = await this.productService.getOthersFilterKhuyenMai();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getOthersSortRate() {
        try {
            const products = await this.productService.getOthersFilterRate();
            console.log(products);
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getAllCoffee() {
        try {
            const products = await this.productService.getProductCoffee();
            console.log(products);
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getCoffeeSortCost() {
        try {
            const products = await this.productService.getCoffeeFilterGia();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getCoffeeSortSale() {
        try {
            const products = await this.productService.getCoffeeFilterKhuyenMai();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getCoffeeSortRate() {
        console.log("123");
        try {
            const products = await this.productService.getCoffeeFilterRate();
            console.log(products);
            console.log("234");
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getAllTraSua() {
        try {
            const products = await this.productService.getProductTraSua();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getTraSuaSortCost() {
        try {
            const products = await this.productService.getTraSuaFilterGia();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getTraSuaSortSale() {
        try {
            const products = await this.productService.getTraSuaFilterKhuyenMai();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getTraSuaSortRate() {
        try {
            const products = await this.productService.getTraSuaFilterRate();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getAllSinhTo() {
        try {
            const products = await this.productService.getProductSinhTo();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getSinhToSortCost() {
        try {
            const products = await this.productService.getSinhToFilterGia();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getSinhToSortSale() {
        try {
            const products = await this.productService.getSinhToFilterKhuyenMai();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
    async getSinhToSortRate() {
        try {
            const products = await this.productService.getSinhToFilterRate();
            return new globalClass_1.ResponseData(products, gobalEnum_1.HttpStatus.SUCCESS, gobalEnum_1.HttpMessage.SUCCESS);
        }
        catch (error) {
            return new globalClass_1.ResponseData([], gobalEnum_1.HttpStatus.ERROR, gobalEnum_1.HttpMessage.ERROR);
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('id_product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ProductController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof product_entity_1.ProductEntity !== "undefined" && product_entity_1.ProductEntity) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    (0, common_1.Delete)("delete-product/:id_product"),
    __param(0, (0, common_1.Param)('id_product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ProductController.prototype, "deleteProductById", null);
__decorate([
    (0, common_1.Put)('/update-product/:id_product'),
    __param(0, (0, common_1.Param)('id_product')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof product_entity_1.ProductEntity !== "undefined" && product_entity_1.ProductEntity) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ProductController.prototype, "suaProduct", null);
__decorate([
    (0, common_1.Get)('/:id_product'),
    __param(0, (0, common_1.Param)('id_product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Get)("/others/single"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ProductController.prototype, "getOthersProduct", null);
__decorate([
    (0, common_1.Get)("/others/sortCost"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ProductController.prototype, "getOtherSortCost", null);
__decorate([
    (0, common_1.Get)("/others/sortSale"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ProductController.prototype, "getOthersSortSale", null);
__decorate([
    (0, common_1.Get)("/others/sortRate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ProductController.prototype, "getOthersSortRate", null);
__decorate([
    (0, common_1.Get)("/caphe/single"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ProductController.prototype, "getAllCoffee", null);
__decorate([
    (0, common_1.Get)("/caphe/sortCost"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], ProductController.prototype, "getCoffeeSortCost", null);
__decorate([
    (0, common_1.Get)("/caphe/sortSale"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], ProductController.prototype, "getCoffeeSortSale", null);
__decorate([
    (0, common_1.Get)("/caphe/sortRate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ProductController.prototype, "getCoffeeSortRate", null);
__decorate([
    (0, common_1.Get)("/trasua/single"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], ProductController.prototype, "getAllTraSua", null);
__decorate([
    (0, common_1.Get)("/trasua/sortCost"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], ProductController.prototype, "getTraSuaSortCost", null);
__decorate([
    (0, common_1.Get)("/trasua/sortSale"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], ProductController.prototype, "getTraSuaSortSale", null);
__decorate([
    (0, common_1.Get)("/trasua/sortRate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], ProductController.prototype, "getTraSuaSortRate", null);
__decorate([
    (0, common_1.Get)("/sinhto/single"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], ProductController.prototype, "getAllSinhTo", null);
__decorate([
    (0, common_1.Get)("/sinhto/sortCost"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], ProductController.prototype, "getSinhToSortCost", null);
__decorate([
    (0, common_1.Get)("/sinhto/sortSale"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], ProductController.prototype, "getSinhToSortSale", null);
__decorate([
    (0, common_1.Get)("/sinhto/sortRate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], ProductController.prototype, "getSinhToSortRate", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ca85f36c20f06e07958d")
/******/ })();
/******/ 
/******/ }
;