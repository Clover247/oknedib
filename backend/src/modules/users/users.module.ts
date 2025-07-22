import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './3-domain/entities/user.entity';
import { UsersController } from './1-presentation/controllers/users.controller';
import { UsersService } from './2-application/users.service';
import { ProfileController } from './1-presentation/controllers/profile.controller';
import { ProfileService } from './2-application/profile.service';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, ProfileService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
