import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TheLoaiEntity } from "./theloai.entity";
import { TheLoaiController } from "./theloai.controller";
import { TheLoaiService } from "./theloai.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([TheLoaiEntity])
    ],
    controllers: [TheLoaiController],
    providers: [TheLoaiService]
})
export class TheLoaiModule {

}