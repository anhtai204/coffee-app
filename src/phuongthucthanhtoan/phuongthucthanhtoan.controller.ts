import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { PhuongThucThanhToanService } from "./phuongthucthanhtoan.service";
import { PhuongThucThanhToanEntity } from "./phuongthucthanhtoan.entity";

@Controller('phuongthucthanhtoan')
export class PhuongThucThanhToanController{
    constructor(private readonly PhuongThucThanhToanService: PhuongThucThanhToanService){}

    @Get()
    async getAllPhuongThuc(): Promise<ResponseData<PhuongThucThanhToanEntity[]>> {
        try {
            const a = await this.PhuongThucThanhToanService.getAllPhuongThuc();
            return new ResponseData<PhuongThucThanhToanEntity[]>(a, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<PhuongThucThanhToanEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}