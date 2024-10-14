import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { TheLoaiService } from "./theloai.service";
import { TheLoaiEntity } from "./theloai.entity";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";

@Controller('theloai')
export class TheLoaiController{
    constructor(private readonly TheLoaiService: TheLoaiService){}

    @Post()
    async createTheLoai(@Body() theLoai: TheLoaiEntity): Promise<ResponseData<TheLoaiEntity>> {
        try {
            console.log(theLoai);
            const saveTheLoai = await this.TheLoaiService.save(theLoai);
            return new ResponseData<TheLoaiEntity>(saveTheLoai, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<TheLoaiEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get()
    async getAllTheLoai(): Promise<ResponseData<TheLoaiEntity[]>> {
        try {
            const theLoai = await this.TheLoaiService.getTheLoai();
            return new ResponseData<TheLoaiEntity[]>(theLoai, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<TheLoaiEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}