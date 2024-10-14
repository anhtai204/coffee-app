import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductToppingEntity } from "./product_topping.entity";
import { ProductToppingService } from "./product_topping.service";
import { ProductToppingController } from "./product_topping.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([ProductToppingEntity])
    ],
    controllers: [ProductToppingController],
    providers: [ProductToppingService]
})
export class ProductToppingModule {

}