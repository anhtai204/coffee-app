import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TheLoaiEntity } from "./theloai.entity";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class TheLoaiService {
    constructor(
        @InjectRepository(TheLoaiEntity) private readonly userRepository: Repository<TheLoaiEntity>
    ){}

    async save(theLoai: TheLoaiEntity): Promise<TheLoaiEntity>{
        const saveTheLoai = await this.userRepository.save(theLoai);
        console.log(saveTheLoai);
        return saveTheLoai;
    }

    async getTheLoai(): Promise<TheLoaiEntity[]>{
        const theLoai = await this.userRepository.find()
        return theLoai;
    }

}