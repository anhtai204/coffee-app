import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { RateEntity } from "src/rate/rate.entity";
import { RateModule } from "src/rate/rate.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([ProductEntity, RateEntity]),
        RateModule
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {

}