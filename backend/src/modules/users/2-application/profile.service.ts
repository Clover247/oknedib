
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../3-domain/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../1-presentation/dtos/update-profile.dto';
import { CloudinaryService } from '@/shared/services/cloudinary.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    await this.usersRepository.update(id, updateProfileDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async uploadAvatar(id: string, file: Express.Multer.File): Promise<User> {
    const result = await this.cloudinaryService.uploadStream(file);
    await this.usersRepository.update(id, { avatarUrl: result.url });
    return this.usersRepository.findOne({ where: { id } });
  }
}
