import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";
import { ProductToppingEntity } from "./product_topping.entity";

@Injectable()
export class ProductToppingService {
    constructor(
        @InjectRepository(ProductToppingEntity) private readonly productToppingRepository: Repository<ProductToppingEntity>
    ){}

    async save(productTopping: ProductToppingEntity): Promise<ProductToppingEntity>{
        const saveProductTopping = await this.productToppingRepository.save(productTopping);
        return saveProductTopping;
    }

}