import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RateModule } from "src/rate/rate.module";
import { KhuyenMaiEntity } from "./khuyenmai.entity";
import { KhuyenMaiService } from "./khuyenmai.service";
import { KhuyenMaiController } from "./khuyenmai.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([KhuyenMaiEntity])
    ],
    controllers: [KhuyenMaiController],
    providers: [KhuyenMaiService]
})
export class KhuyenMaiModule {

}