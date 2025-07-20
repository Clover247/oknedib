import { JwtService } from '@nestjs/jwt';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(createUserDto: any): Promise<any>;
}
