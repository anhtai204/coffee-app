import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhuongThucThanhToanEntity } from "./phuongthucthanhtoan.entity";
import { PhuongThucThanhToanController } from "./phuongthucthanhtoan.controller";
import { PhuongThucThanhToanService } from "./phuongthucthanhtoan.service";
@Module({
    imports:[
        TypeOrmModule.forFeature([PhuongThucThanhToanEntity])
    ],
    controllers: [PhuongThucThanhToanController],
    providers: [PhuongThucThanhToanService]
})
export class PhuongThucThanhToanModule {

}