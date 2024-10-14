import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KhuyenMaiEntity } from "./khuyenmai.entity";
import { KhuyenMaiController } from "./khuyenmai.controller";
import { KhuyenMaiService } from "./khuyenmai.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([KhuyenMaiEntity])
    ],
    controllers: [KhuyenMaiController],
    providers: [KhuyenMaiService]
})
export class KhuyenMaiModule {

}