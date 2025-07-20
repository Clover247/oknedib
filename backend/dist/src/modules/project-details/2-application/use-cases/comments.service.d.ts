import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Task } from '@/modules/tasks/3-domain/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '@/modules/project-details/1-presentation/dtos/create-comment.dto';
import { UpdateCommentDto } from '@/modules/project-details/1-presentation/dtos/update-comment.dto';
export declare class CommentsService {
    private commentsRepository;
    private projectsRepository;
    private usersRepository;
    private tasksRepository;
    constructor(commentsRepository: Repository<Comment>, projectsRepository: Repository<Project>, usersRepository: Repository<User>, tasksRepository: Repository<Task>);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
    findAll(projectId: string): Promise<Comment[]>;
    findOne(id: string): Promise<Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    remove(id: string): Promise<void>;
}
