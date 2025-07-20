import { User } from '@/modules/users/3-domain/entities/user.entity';
export declare class GoogleApiCredentials {
    id: string;
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: string;
}
