
import { Controller, Patch, Body, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from '../../2-application/profile.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';
import { GetUser } from '@/modules/auth/1-presentation/decorators/get-user.decorator';
import { User } from '@/modules/users/3-domain/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch()
  update(@GetUser() user: User, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(user.id, updateProfileDto);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@GetUser() user: User, @UploadedFile() file: Express.Multer.File) {
    return this.profileService.uploadAvatar(user.id, file);
  }
}
