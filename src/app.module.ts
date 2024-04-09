import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { UserEntity } from './entities/user';
import { UserModule } from './user/user.module';
import { CONSTANTS } from './CONSTANTS';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: CONSTANTS.dbHost,
      port: CONSTANTS.dbPort,
      username: CONSTANTS.dbUsername,
      password: CONSTANTS.dbPassword,
      database: CONSTANTS.dbName,
      // entities: [UserEntity],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // dropSchema: true
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
