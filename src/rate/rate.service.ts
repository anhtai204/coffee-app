import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";
import { RateEntity } from "./rate.entity";
import { UserEntity } from "src/users/user.entity";
import { ProductEntity } from "src/product/product.entity";

@Injectable()
export class RateService {
    constructor(
        @InjectRepository(RateEntity) private readonly rateRepository: Repository<RateEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
    ){}

    // async save(rate: RateEntity): Promise<RateEntity> {
    //     // Xác thực rằng id_user và id_product tồn tại trong database
    //     const user = await this.userRepository.findOne({ where: { id_user: rate.id_user } });
    //     const product = await this.productRepository.findOne({ where: { id_product: rate.id_product } });

    //     if (!user) {
    //         throw new Error(`User with ID ${rate.id_user} does not exist`);
    //     }

    //     if (!product) {
    //         throw new Error(`Product with ID ${rate.id_product} does not exist`);
    //     }

    //     // Sau khi xác thực, lưu đánh giá vào database
    //     const savedRate = await this.rateRepository.save(rate);
    //     return savedRate;
    // }
    
    async save(rate: RateEntity): Promise<void> {
        // Xác thực rằng id_user và id_product tồn tại trong database
        const user = await this.userRepository.findOne({ where: { id_user: rate.id_user } });
        const product = await this.productRepository.findOne({ where: { id_product: rate.id_product } });

        if (!user) {
            throw new Error(`User with ID ${rate.id_user} does not exist`);
        }

        if (!product) {
            throw new Error(`Product with ID ${rate.id_product} does not exist`);
        }

        // Gọi stored procedure để thực hiện upsert
        await this.rateRepository.query(
            `CALL UpsertRate(?, ?, ?, ?)`,
            [rate.id_product, rate.id_user, rate.soLuongSao, rate.comment]
        );
    }

    async getCountRate(id_product: number): Promise<number> {
        const count = await this.rateRepository.findAndCount({
            where: {
                product: { id_product: id_product } // Access the product relation and match by its id
            }
        });
        return count[1]; // `findAndCount` returns [entities, count], so we return the count
    }
    
    


}