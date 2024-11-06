import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";
import { PhuongThucThanhToanEntity } from "./phuongthucthanhtoan.entity";

@Injectable()
export class PhuongThucThanhToanService {
    constructor(
        @InjectRepository(PhuongThucThanhToanEntity) private readonly khuyenMaiRepository: Repository<PhuongThucThanhToanEntity>
    ){}


}