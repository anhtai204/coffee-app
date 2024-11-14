import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
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

    @Delete("/delete-khuyen-mai/:id_khuyen_mai")
    async xoaKhuyenMai(@Param('id_khuyen_mai') id_khuyen_mai:number): Promise<ResponseData<Boolean>>{
        const result = await this.KhuyenMaiService.deleteKhuyenMai(id_khuyen_mai);

        if (result) {
            return new ResponseData<Boolean>(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } else {
            return new ResponseData<Boolean>(result, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/update-khuyen-mai/:id_khuyen_mai')
    async updateKhuyenMai(@Param('id_khuyen_mai') id_khuyen_mai: number, @Body() update_khuyen_mai: KhuyenMaiEntity): Promise<ResponseData<KhuyenMaiEntity>>{
        try {
            const khuyenMai = await this.KhuyenMaiService.updateKhuyenMai(id_khuyen_mai, update_khuyen_mai);
            return new ResponseData<KhuyenMaiEntity>(khuyenMai, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.error('Error updating khuyến mại:', error);
            return new ResponseData<KhuyenMaiEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}