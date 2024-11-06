import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RateEntity } from "./rate.entity";
import { RateController } from "./rate.controller";
import { RateService } from "./rate.service";
import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/users/user.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([RateEntity, ProductEntity, UserEntity])
    ],
    controllers: [RateController],
    providers: [RateService]
})
export class RateModule {

}