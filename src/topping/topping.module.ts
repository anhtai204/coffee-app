import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToppingEntity } from "./topping.entity";
import { ToppingController } from "./topping.controller";
import { ToppingService } from "./topping.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([ToppingEntity])
    ],
    controllers: [ToppingController],
    providers: [ToppingService]
})
export class ToppingModule {

}