import { BadRequestException, Injectable } from '@nestjs/common';
import { CONSTANTS } from 'src/constants';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleGuard } from 'src/role.guard';

import * as bcrypt from 'bcrypt';
const saltRounds = 13;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async getUser(email: string) {
    console.log('usercontrollergetuser', email);
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);
    return user;
  }

  async saveUser(body) {
    if (!body.email || !body.password) {
      return { status: 'fail', message: 'Email and password are required' };
    }
    let user = new UserEntity();
    user.email = body.email;
    user.password = await bcrypt.hash(body.password, saltRounds);
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async resetPass(email, body) {
    let user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return { status: 'fail', message: 'User not found' };
    }
    if (!body.npassword || !body.opassword) {
      return {
        status: 'fail',
        message: 'New password and old password are required',
      };
    }

    const match = await bcrypt.compare(body.opassword, user.password);
    console.log('match', match);
    if (match) {
      user.password = await bcrypt.hash(body.npassword, saltRounds);
      user = await this.userRepository.save(user);
      delete user.password;
      return user ? { status: 'success' } : BadRequestException;
    }
    return { status: 'fail', message: 'Old password is incorrect' };
  }
}
