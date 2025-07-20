import { Repository } from 'typeorm';
import { Task } from '../../3-domain/entities/task.entity';
import { CreateTaskDto } from '../../1-presentation/dtos/create-task.dto';
import { UpdateTaskDto } from '../../1-presentation/dtos/update-task.dto';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    findAll(): Promise<Task[]>;
    findOne(id: string): Promise<Task>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: string): Promise<void>;
}
