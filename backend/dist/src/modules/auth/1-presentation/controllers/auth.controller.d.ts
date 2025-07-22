import { AuthService } from '@/modules/auth/2-application/services/auth.service';
import { RegisterDto } from '@/modules/auth/1-presentation/dtos/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<any>;
    login(req: any): Promise<{
        accessToken: string;
        user: any;
    }>;
    getProfile(req: any): any;
}
