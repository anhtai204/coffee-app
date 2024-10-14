import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";
import { RateEntity } from "./rate.entity";

@Injectable()
export class RateService {
    constructor(
        @InjectRepository(RateEntity) private readonly rateRepository: Repository<RateEntity>
    ){}

    // async save(rate: RateEntity): Promise<RateEntity>{
    //     const rateProduct = await this.rateRepository.save(rate);
    //     console.log(rateProduct);
    //     return rateProduct;
    // }

}