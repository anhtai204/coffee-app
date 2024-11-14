import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RateModule } from "src/rate/rate.module";
import { DonHangEntity } from "./donhang.entity";
import { DonHangController } from "./donhang.controller";
import { DonHangService } from "./donhang.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([DonHangEntity])
    ],
    controllers: [DonHangController],
    providers: [DonHangService]
})
export class DonHangModule {

}