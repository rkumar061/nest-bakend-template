import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role.guard';
import { CONSTANTS } from './constants';
import { UserService } from './user/user.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    console.log('appcontrollerlogin', req.user);
    const user = req.user;

    // remove user.password;
    delete user.password;

    // const user = "dbhfgijdebgjhd";
    const tokken = await this.authService.generateToken(user);
    console.log('appcontrollerlogintoken', tokken);
    return { token: tokken };
  }

  @Post('/register')
  async register(@Body() body) {
    console.log('appcontrollerregister', body);
    const user = await this.userService.getUser(body.email);
    console.log('appcontrollerregisteruser', user);
    if (user == null) {
      const newUser = await this.userService.saveUser(body);
      console.log('appcontrollerregisternewuser', newUser);
      // delete newUser.password;
      return newUser;
    } else {
      return 'User already exists';
    }
  }
}
