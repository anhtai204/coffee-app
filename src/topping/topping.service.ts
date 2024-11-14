import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ToppingEntity } from "./topping.entity";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ToppingService {
    constructor(
        @InjectRepository(ToppingEntity) private readonly toppingRepository: Repository<ToppingEntity>
    ){}

    async save(topping: ToppingEntity): Promise<ToppingEntity>{
        const saveTopping = await this.toppingRepository.save(topping);
        console.log(saveTopping);
        return saveTopping;
    }

    async getTopping(): Promise<ToppingEntity[]>{
        const toppings = await this.toppingRepository.find()
        return toppings;
    }


    async deleteTopping(id_topping: number): Promise<Boolean>{
        try {
            const topping = await this.toppingRepository.findOne({
                where: {
                    id_topping: id_topping,
                },
            });

            await this.toppingRepository.remove(topping);
            return true;
        } catch(error){
            console.error("Lỗi khi xóa topping", error);
            return false;
        }
    }

    async updateTopping(id_topping: number, update_topping: ToppingEntity): Promise<ToppingEntity>{
        try {
            const topping = await this.toppingRepository.findOne({
                where: {
                    id_topping: id_topping,
                },
            });

            topping.topping_name = update_topping.topping_name;
            topping.giaTopping = update_topping.giaTopping;
            await this.toppingRepository.save(topping);
            return topping;

        } catch (error) {
            console.error('Lỗi khi sửa topping:', error);
            return;
        }
    }

}