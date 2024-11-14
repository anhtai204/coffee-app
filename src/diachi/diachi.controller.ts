import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { DiaChiService } from "./diachi.service";
import { DiaChiEntity } from "./diachi.entity";

@Controller('diachi')
export class DiaChiController{
    constructor(private readonly DiaChiService: DiaChiService){}

    @Get()
    async getAllDiaChi(): Promise<ResponseData<DiaChiEntity[]>> {
        try {
            const a = await this.DiaChiService.getAllDiaChi();
            return new ResponseData<DiaChiEntity[]>(a, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<DiaChiEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}