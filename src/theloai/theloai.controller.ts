import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
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


    @Delete("/xoa-the-loai/:id_theLoai")
    async xoaTheLoaiById(@Param('id_theLoai') id_theLoai:number): Promise<ResponseData<Boolean>>{
        const result = await this.TheLoaiService.deleteTheLoai(id_theLoai);

        if (result) {
            return new ResponseData<Boolean>(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } else {
            return new ResponseData<Boolean>(result, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/sua-the-loai/:id_theLoai')
    async suaTheLoai(@Param('id_theLoai') id_theLoai:number, @Body('new_tenTheLoai') new_tenTheLoai: string): Promise<ResponseData<Boolean>> {
        try {
            const check = await this.TheLoaiService.updateTheLoai(id_theLoai, new_tenTheLoai);
            return new ResponseData<Boolean>(check, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.error('Error updating theloai:', error);
            return new ResponseData<Boolean>(false, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}