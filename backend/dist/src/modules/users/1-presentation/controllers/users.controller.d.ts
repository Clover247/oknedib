import { UsersService } from '../../2-application/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../../3-domain/entities/user.entity").User[]>;
}
