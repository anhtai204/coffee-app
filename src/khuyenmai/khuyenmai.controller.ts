import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { KhuyenMaiService } from "./khuyenmai.service";
import { KhuyenMaiEntity } from "./khuyenmai.entity";

@Controller('khuyenmai')
export class KhuyenMaiController{
    constructor(private readonly KhuyenMaiService: KhuyenMaiService){}

    @Post()
    async createKhuyenMai(@Body() khuyenMai: KhuyenMaiEntity): Promise<ResponseData<KhuyenMaiEntity>> {
        try {
            console.log(khuyenMai);
            const saveKhuyenMai = await this.KhuyenMaiService.save(khuyenMai);
            return new ResponseData<KhuyenMaiEntity>(saveKhuyenMai, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<KhuyenMaiEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get()
    async getAllKhuyenMai(): Promise<ResponseData<KhuyenMaiEntity[]>> {
        try {
            const khuyenMais = await this.KhuyenMaiService.getKhuyenMai();
            return new ResponseData<KhuyenMaiEntity[]>(khuyenMais, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<KhuyenMaiEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}