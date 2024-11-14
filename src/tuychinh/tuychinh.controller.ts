// import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
// import { ResponseData } from "src/global/globalClass";
// import { HttpMessage, HttpStatus } from "src/global/gobalEnum";
// import { TuyChinhService } from "./tuychinh.service";
// import { TuyChinhEntity } from "./tuychinh.entity";

// @Controller('tuy-chinh')
// export class TuyChinhController{
//     constructor(private readonly TuyChinhService: TuyChinhService){}

//     @Post()
//     async createTuyChinh(@Body() tuyChinh: TuyChinhEntity): Promise<ResponseData<TuyChinhEntity>> {
//         try {
//             console.log(tuyChinh);
//             const saveTuyChinh = await this.TuyChinhService.save(tuyChinh);
//             return new ResponseData<TuyChinhEntity>(saveTuyChinh, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
//         } catch (error) {
//             return new ResponseData<TuyChinhEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
//         }
//     }
// }