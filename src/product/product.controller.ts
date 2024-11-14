import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer'; // Import diskStorage từ multer
import { extname } from 'path'; // Import extname từ path
import { Express } from 'express'; // Import Express từ @types/express

@Controller('product')
export class ProductController{
    constructor(private readonly productService: ProductService){}


    // uploads
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
        destination: './uploads', // Thư mục lưu ảnh
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`); // Tạo tên file ngẫu nhiên
        },
        }),
    }))
    // async uploadFile(
    //     @UploadedFile() file: any,
    //     @Body('productId') productId: number,
    // ) {
    //     // Cập nhật đường dẫn logo_product vào database
    //     const updatedProduct = await this.productService.updateProductLogo(productId, file.filename);
    //     return { message: 'File uploaded successfully!', product: updatedProduct };
    // }

    async uploadFile(
        @UploadedFile() file: any,
        @Body('id_product') id_product: number,
    ): Promise<ResponseData<ProductEntity>> {
        // Cập nhật đường dẫn logo_product vào database
        const updatedProduct = await this.productService.updateProductLogo(id_product, file.filename);
        // return { message: 'File uploaded successfully!', product: updatedProduct };
        return new ResponseData<ProductEntity>(updatedProduct, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    }

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

    @Delete("delete-product/:id_product")
    async deleteProductById(@Param('id_product') id_product:number): Promise<ResponseData<Boolean>>{
        const result = await this.productService.deleteProduct(id_product);

        if (result) {
            return new ResponseData<Boolean>(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } else {
            return new ResponseData<Boolean>(result, HttpStatus.ERROR, HttpMessage.ERROR);
        }

    }


    @Put('/update-product/:id_product')
    async suaProduct(@Param('id_product') id_product: number, @Body() new_product: ProductEntity): Promise<ResponseData<ProductEntity>> {
        try {
            const product = await this.productService.updateProduct(id_product, new_product);
            return new ResponseData<ProductEntity>(product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.error('Error updating product:', error);
            return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id_product')
    async getProductById(@Param('id_product') id_product:number): Promise<ResponseData<ProductEntity>>{
        try {
            const product = await this.productService.getProductById(id_product);
            return new ResponseData<ProductEntity>(product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }




    // other product
    @Get("/others/single")
    async getOthersProduct(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getProductOthers();
            console.log(products);
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/others/sortCost")
    async getOtherSortCost(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getOthersFilterGia();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get("/others/sortSale")
    async getOthersSortSale(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getOthersFilterKhuyenMai();
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Get("/others/sortRate")
    async getOthersSortRate(): Promise<ResponseData<ProductEntity[]>> {
        try {
            const products = await this.productService.getOthersFilterRate();
            console.log(products);
            return new ResponseData<ProductEntity[]>(products, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }



    // Ca phe
    @Get("/caphe/single")
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
    @Get("/trasua/single")
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
    @Get("/sinhto/single")
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