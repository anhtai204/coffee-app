import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ToppingEntity } from "./topping.entity";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ToppingService {
    constructor(
        @InjectRepository(ToppingEntity) private readonly userRepository: Repository<ToppingEntity>
    ){}

    async save(topping: ToppingEntity): Promise<ToppingEntity>{
        const saveTopping = await this.userRepository.save(topping);
        console.log(saveTopping);
        return saveTopping;
    }

    async getTopping(): Promise<ToppingEntity[]>{
        const toppings = await this.userRepository.find()
        return toppings;
    }

}