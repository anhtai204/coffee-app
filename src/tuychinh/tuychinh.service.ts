// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository  } from "typeorm";
// import { plainToInstance } from "class-transformer";
// import { TuyChinhEntity } from "./tuychinh.entity";

// @Injectable()
// export class TuyChinhService {
//     constructor(
//         @InjectRepository(TuyChinhEntity) private readonly tuyChinhRepository: Repository<TuyChinhEntity>
//     ){}

//     async save(tuyChinh: TuyChinhEntity): Promise<TuyChinhEntity>{
//         const saveTuyChinh = await this.tuyChinhRepository.save(tuyChinh);
//         console.log(saveTuyChinh);
//         return saveTuyChinh;
//     }

// }