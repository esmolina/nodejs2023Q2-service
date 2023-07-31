import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersStore } from './store/users.storage';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UsersStorageInterface',
      useClass: UsersStore,
    },
  ],
})
export class UserModule {}
