import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
import { DonHangService } from "./donhang.service";
import { DonHangEntity } from "./donhang.entity";

@Controller('donhang')
export class DonHangController{
    constructor(private readonly DonHangService: DonHangService){}

    @Post()
    async createDonHang(@Body() donHang: DonHangEntity): Promise<ResponseData<DonHangEntity>>{
        try {
            console.log(donHang);
            const saveDonHang = await this.DonHangService.save(donHang);
            return new ResponseData<DonHangEntity>(saveDonHang, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error);
            return new ResponseData<DonHangEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    // @Get('latest-id')
    // async getLatestDonHangId(): Promise<ResponseData<number>> {
    //     try {
    //         const latestId = await this.DonHangService.getLatestDonHangId();
    //         return new ResponseData<number>(latestId, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    //     } catch (error) {
    //         console.log(error);
    //         return new ResponseData<number>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    //     }
    // }

    @Get()
    async getAllDonHang(): Promise<ResponseData<DonHangEntity[]>> {
        try {
            const donHang = await this.DonHangService.getDonHang();
            return new ResponseData<DonHangEntity[]>(donHang, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<DonHangEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id_donHang')
    async getDonHangById(@Param('id_donHang') id_donHang:number): Promise<ResponseData<DonHangEntity>>{
        try {
            const donHang = await this.DonHangService.getDonHangById(id_donHang);
            return new ResponseData<DonHangEntity>(donHang, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<DonHangEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/sua-don-hang/:id_donHang')
    async suaTheLoai(@Param('id_donHang') id_donHang:number, @Body() update_donHang: DonHangEntity): Promise<ResponseData<DonHangEntity>> {
        try {
            const donHang = await this.DonHangService.updateDonHang(id_donHang, update_donHang);
            return new ResponseData<DonHangEntity>(donHang, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.error('Error updating donHang:', error);
            return new ResponseData<DonHangEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/get-by-user/:id_user')
    async getDonHangByIdUser(@Param('id_user') id_user: number): Promise<ResponseData<DonHangEntity[]>>{
        try {
            const listDh = await this.DonHangService.getDonHangByUserId(id_user);
            return new ResponseData<DonHangEntity[]>(listDh, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<DonHangEntity[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}