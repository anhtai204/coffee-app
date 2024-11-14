import { Body, Controller, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
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
            return new ResponseData<Boolean>(check, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
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

    // get user from email
    // @Get('/get-user-from-email')
    // async getUserFromEmail(@Query('email') email: string): Promise<UserEntity>{
    //     return this.userService.getUserFromEmail(email);
    // }


    // change password
    @Put('/change-password/:id_user')
    async changePasswordFromId(@Param('id_user') id_user: number, @Body('new_password') new_password: string): Promise<ResponseData<Boolean>> {
        try {
            const check = await this.userService.changePassWord(id_user, new_password);
            return new ResponseData<Boolean>(check, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.error('Error updating password:', error);
            return new ResponseData<Boolean>(false, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id_user')
    async getDonHangByIdUser(@Param('id_user') id_user: number): Promise<ResponseData<UserEntity>>{
        try {
            const user = await this.userService.getUserById(id_user);
            return new ResponseData<UserEntity>(user, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<UserEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


}