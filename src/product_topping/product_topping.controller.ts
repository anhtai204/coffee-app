import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { ProductToppingService } from "./product_topping.service";
import { ProductToppingEntity } from "./product_topping.entity";

@Controller('product-topping')
export class ProductToppingController{
    constructor(private readonly productToppingService: ProductToppingService){}

    @Post()
    async createDonHangTopping(@Body() product_topping: ProductToppingEntity): Promise<ResponseData<ProductToppingEntity>>{
        try {
            console.log(product_topping);
            const saveProductTopping = await this.productToppingService.save(product_topping);
            return new ResponseData<ProductToppingEntity>(saveProductTopping, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error);
            return new ResponseData<ProductToppingEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}