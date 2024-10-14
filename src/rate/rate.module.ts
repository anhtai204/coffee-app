import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RateEntity } from "./rate.entity";
import { RateController } from "./rate.controller";
import { RateService } from "./rate.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([RateEntity])
    ],
    controllers: [RateController],
    providers: [RateService]
})
export class RateModule {

}