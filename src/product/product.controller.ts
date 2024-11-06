import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";

@Controller('product')
export class ProductController{
    constructor(private readonly productService: ProductService){}

    @Post()
    async createProduct(@Body() product: ProductEntity): Promise<ResponseData<ProductEntity>> {
        try {
            console.log(product);
            const saveProduct = await this.productService.save(product);
            return new ResponseData<ProductEntity>(saveProduct, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get()
    async getAllProduct(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getProducts();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    

    // Ca phe

    @Get("/caphe")
    async getAllCoffee(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getProductCoffee();
            console.log(products);
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/caphe/sortCost")
    async getCoffeeSortCost(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getCoffeeFilterGia();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
    

    @Get("/caphe/sortSale")
    async getCoffeeSortSale(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getCoffeeFilterKhuyenMai();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Get("/caphe/sortRate")
    async getCoffeeSortRate(): Promise<ResponseData<ProductEntity[]>> {
        console.log("123");
        try {
            const products = await this.productService.getCoffeeFilterRate();
            console.log(products);
            console.log("234");
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    // Tra sua
    @Get("/trasua")
    async getAllTraSua(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getProductTraSua();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/trasua/sortCost")
    async getTraSuaSortCost(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getTraSuaFilterGia();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/trasua/sortSale")
    async getTraSuaSortSale(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getTraSuaFilterKhuyenMai();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/trasua/sortRate")
    async getTraSuaSortRate(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getTraSuaFilterRate();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    // sinh to
    @Get("/sinhto")
    async getAllSinhTo(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getProductSinhTo();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/sinhto/sortCost")
    async getSinhToSortCost(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getSinhToFilterGia();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/sinhto/sortSale")
    async getSinhToSortSale(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getSinhToFilterKhuyenMai();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/sinhto/sortRate")
    async getSinhToSortRate(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getSinhToFilterRate();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}