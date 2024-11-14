import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiaChiEntity } from "./diachi.entity";
import { DiaChiService } from "./diachi.service";
import { DiaChiController } from "./diachi.controller";
@Module({
    imports:[
        TypeOrmModule.forFeature([DiaChiEntity])
    ],
    controllers: [DiaChiController],
    providers: [DiaChiService]
})
export class DiaChiModule {

}