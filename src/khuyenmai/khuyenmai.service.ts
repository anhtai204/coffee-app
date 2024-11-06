import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class KhuyenMaiService {
    constructor(
        @InjectRepository(KhuyenMaiEntity) private readonly khuyenMaiRepository: Repository<KhuyenMaiEntity>
    ){}


}