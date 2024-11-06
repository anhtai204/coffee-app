import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RateEntity } from "src/rate/rate.entity";
import { RateModule } from "src/rate/rate.module";
import { KhuyenMaiEntity } from "./khuyenmai.entity";
import { KhuyenMaiController } from "./khuyenmai.controller";
import { KhuyenMaiService } from "./khuyenmai.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([KhuyenMaiEntity]),
        RateModule
    ],
    controllers: [KhuyenMaiController],
    providers: [KhuyenMaiService]
})
export class KhuyenMaiModule {

}