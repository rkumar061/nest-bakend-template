import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'pashion',
    entities: [UserEntity],
    synchronize: true,
    // dropSchema: true
  }), AuthModule, UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
