import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";
import { DiaChiEntity } from "./diachi.entity";

@Injectable()
export class DiaChiService {
    constructor(
        @InjectRepository(DiaChiEntity) private readonly diaChiRepository: Repository<DiaChiEntity>
    ){}

    async getAllDiaChi(): Promise<DiaChiEntity[]>{
        const diachi = await this.diaChiRepository.find();

        return diachi;
    }


}