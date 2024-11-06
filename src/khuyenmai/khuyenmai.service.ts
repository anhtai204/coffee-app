import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { KhuyenMaiEntity } from "./khuyenmai.entity";

@Injectable()
export class KhuyenMaiService {
    constructor(
        @InjectRepository(KhuyenMaiEntity) private readonly khuyenMaiRepository: Repository<KhuyenMaiEntity>
    ){}

    async getKhuyenMai(): Promise<KhuyenMaiEntity[]>{
        const khuyenmai = await this.khuyenMaiRepository.find();
        return khuyenmai;
    }
    
    async save(khuyenMai: KhuyenMaiEntity): Promise<KhuyenMaiEntity>{
        const saveKhuyenMai = await this.khuyenMaiRepository.save(khuyenMai);
        return saveKhuyenMai;
    }


}