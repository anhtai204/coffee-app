import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { RateService } from "./rate.service";
import { RateEntity } from "./rate.entity";

@Controller('rate')
export class RateController{
    constructor(private readonly rateService: RateService){}

    // @Post()
    // async createRate(@Body() rate: RateEntity): Promise<ResponseData<RateEntity>> {
    //     try {
    //         console.log(rate);
    //         const saveRate = await this.rateService.save(rate);
    //         return new ResponseData<RateEntity>(saveRate, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    //     } catch (error) {
    //         return new ResponseData<RateEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    //     }
    // }


}