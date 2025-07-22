import { ProfileService } from '../../2-application/profile.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { User } from '@/modules/users/3-domain/entities/user.entity';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    update(user: User, updateProfileDto: UpdateProfileDto): Promise<User>;
    uploadAvatar(user: User, file: Express.Multer.File): Promise<User>;
}
