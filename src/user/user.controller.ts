import { Controller, Param, Post, UseGuards, Request,Get, Body, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get('/')
    async getUser(@Request() req) {
        console.log('usercontrollergetuser', req.user.user.email);
        const user = await this.userService.getUser(req.user.user.email);
        delete user.password;
        return user;
    }

    @Post('/resetpassword')
    async updateUser(@Request() req, @Body() body) {
        if (!body.npassword || !body.opassword) {
            return BadRequestException;
        }
        console.log('usercontrollerupdateuser', req.user.user.email);
        const user = await this.userService.resetPass(req.user.user.email, body);
        
        return user;
    }



}
