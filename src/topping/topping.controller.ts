import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ToppingService } from "./topping.service";
import { ToppingEntity } from "./topping.entity";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";

@Controller('topping')
export class ToppingController{
    constructor(private readonly ToppingService: ToppingService){}

    @Post()
    async createTopping(@Body() topping: ToppingEntity): Promise<ResponseData<ToppingEntity>> {
        try {
            console.log(topping);
            const saveTopping = await this.ToppingService.save(topping);
            return new ResponseData<ToppingEntity>(saveTopping, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ToppingEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get()
    async getAllTopping(): Promise<ResponseData<ToppingEntity[]>> {
        try {
            const toppings = await this.ToppingService.getTopping();
            console.log(toppings);
            return new ResponseData<ToppingEntity[]>(toppings, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error);
            return new ResponseData<ToppingEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}