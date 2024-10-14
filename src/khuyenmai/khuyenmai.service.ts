import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";
import { KhuyenMaiEntity } from "./khuyenmai.entity";

@Injectable()
export class KhuyenMaiService {
    constructor(
        @InjectRepository(KhuyenMaiEntity) private readonly khuyenMaiRepository: Repository<KhuyenMaiEntity>
    ){}

    async save(khuyenMai: KhuyenMaiEntity): Promise<KhuyenMaiEntity>{
        const saveKhuyenMai = await this.khuyenMaiRepository.save(khuyenMai);
        console.log(saveKhuyenMai);
        return saveKhuyenMai;
    }

    async getKhuyenMai(): Promise<KhuyenMaiEntity[]>{
        const khuyenMai = await this.khuyenMaiRepository.find()
        return khuyenMai;
    }

}