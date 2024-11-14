import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TheLoaiEntity } from "./theloai.entity";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class TheLoaiService {
    constructor(
        @InjectRepository(TheLoaiEntity) private readonly theLoaiRepository: Repository<TheLoaiEntity>
    ){}

    async save(theLoai: TheLoaiEntity): Promise<TheLoaiEntity>{
        const saveTheLoai = await this.theLoaiRepository.save(theLoai);
        console.log(saveTheLoai);
        return saveTheLoai;
    }

    async getTheLoai(): Promise<TheLoaiEntity[]>{
        const theLoai = await this.theLoaiRepository.find()
        return theLoai;
    }


    async deleteTheLoai(id_theLoai: number): Promise<Boolean> {
        try {
            const theLoai = await this.theLoaiRepository.findOne({
                where: {
                    id_theLoai: id_theLoai,
                },
            });
    
            await this.theLoaiRepository.remove(theLoai);
            return true;
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi xóa thể loại:', error);
            return false;
        }
    }

    async updateTheLoai(id_theLoai: number, new_tenTheLoai: string): Promise<Boolean> {
        try {
            const theLoai = await this.theLoaiRepository.findOne({
                where: {
                    id_theLoai: id_theLoai,
                },
            });

            theLoai.ten_the_loai = new_tenTheLoai;
            await this.theLoaiRepository.save(theLoai);
            return true;
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi sửa thể loại:', error);
            return false;
        }
    }

}