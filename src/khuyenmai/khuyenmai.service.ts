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

    async deleteKhuyenMai(id_khuyen_mai: number): Promise<Boolean>{
        try {
            const khuyenMai = await this.khuyenMaiRepository.findOne({
                where: {
                    id_khuyen_mai: id_khuyen_mai,
                },
            });

            await this.khuyenMaiRepository.remove(khuyenMai);
            return true;
        } catch(error){
            console.error("Lỗi khi xóa khuyến mại", error);
            return false;
        }
    }

    async updateKhuyenMai(id_khuyen_mai: number, update_khuyen_mai: KhuyenMaiEntity): Promise<KhuyenMaiEntity>{
        try {
            const khuyenMai = await this.khuyenMaiRepository.findOne({
                where: {
                    id_khuyen_mai: id_khuyen_mai,
                },
            });

            khuyenMai.phanTramKhuyenMai = update_khuyen_mai.phanTramKhuyenMai;
            khuyenMai.donHangToiThieu = update_khuyen_mai.donHangToiThieu;
            await this.khuyenMaiRepository.save(khuyenMai);
            return khuyenMai;

        } catch (error) {
            console.error('Lỗi khi sửa khuyến mại:', error);
            return;
        }
    }
}