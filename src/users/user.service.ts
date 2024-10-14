import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ){}

    async save(user: UserEntity): Promise<UserEntity>{
        const saveUser = await this.userRepository.save(user);
        console.log(saveUser);
        return saveUser;
    }

    async getUsers(): Promise<UserEntity[]>{
        const users = await this.userRepository.find()
        return users;
    }

    async updatePassword(email: string, newPassword: string): Promise<Boolean>{
        return
    } 

    async checkEmailExists(email_input: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOne({ where: { email: email_input } });
            console.log(`Checking email: ${email_input}, Exists: ${user !== null}`);
            return user !== null;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    }
    

    
}