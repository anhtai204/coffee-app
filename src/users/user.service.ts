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

    async changePassWord(id_user: number, new_password: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOne({ where: { id_user: id_user } });
            if (!user) {
                return false; // Không tìm thấy user
            }
            user.password = new_password; // Cập nhật mật khẩu mới (cần mã hóa trước khi lưu)
            await this.userRepository.save(user); // Lưu thay đổi
            return true;
        } catch (error) {
            console.error('Error updating password:', error);
            return false;
        }
    }
    

    // async getUserFromEmail(email_in: string): Promise<UserEntity>{
    //     try {
    //         const user = await this.userRepository.findOne({ where: { email: email_in } });
    //         return user;
    //     } catch (error){
    //         console.error('Error checking email:', error);
    //         return null;
    //     }
    // }
    

    
}