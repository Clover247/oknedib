import { User } from '../3-domain/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../1-presentation/dtos/update-profile.dto';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
export declare class ProfileService {
    private usersRepository;
    private cloudinaryService;
    constructor(usersRepository: Repository<User>, cloudinaryService: CloudinaryService);
    update(id: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    uploadAvatar(id: string, file: Express.Multer.File): Promise<User>;
}
