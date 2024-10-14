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

    // async save(rate: RateEntity): Promise<RateEntity>{
    //     const rateProduct = await this.rateRepository.save(rate);
    //     console.log(rateProduct);
    //     return rateProduct;
    // }

}