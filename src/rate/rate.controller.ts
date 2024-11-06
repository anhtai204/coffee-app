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

    @Post()
    async createRate(@Body() rate: RateEntity): Promise<ResponseData<void>> {
        try {
            console.log(rate);
            // Gọi hàm save (thực hiện stored procedure) từ RateService
            await this.rateService.save(rate);

            // Trả về phản hồi thành công nếu không có lỗi xảy ra
            return new ResponseData<void>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            // Xử lý lỗi và trả về phản hồi lỗi
            return new ResponseData<void>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Get('/:id_product/count_rate')
    async getCountRateByIdProduct(@Param('id_product') id_product:number): Promise<ResponseData<Number>>{
        try {
            const count_rate = await this.rateService.getCountRate(id_product);
            return new ResponseData<Number>(count_rate, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Number>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


}