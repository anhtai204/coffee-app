import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";

@Controller('khuyenmai')
export class PhuongThucThanhToanController{
    constructor(private readonly PhuongThucThanhToanService: PhuongThucThanhToanController){}


}