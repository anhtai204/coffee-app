import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/gobalEnum";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(@Body() user: UserEntity): Promise<ResponseData<UserEntity>> {
        try {
            console.log(user);
            const saveUser = await this.userService.save(user);
            return new ResponseData<UserEntity>(saveUser, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<UserEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get()
    async getAllUser(): Promise<ResponseData<UserEntity[]>> {
        try {
            const users = await this.userService.getUsers();
            return new ResponseData<UserEntity[]>(users, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<UserEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    // Update mật khẩu
    @Post()
    async updatePassword(@Param('email') email: string, @Param('password') password: string): Promise<ResponseData<Boolean>> {
        const check = await this.userService.updatePassword(email, password);
        try {
            return new ResponseData<Boolean>(check, HttpStatus.ERROR, HttpMessage.ERROR);
        } catch (error){
            return new ResponseData<Boolean>(check, HttpStatus.ERROR, HttpMessage.ERROR);
        }

    }

    // check email
    @Get('/check-email')
    async checkEmailExists(@Query('email') email: string): Promise<boolean> {
        console.log(`Checking email: ${email}`); // Log email
        return this.userService.checkEmailExists(email);
    }

}