import { TasksService } from '../../2-application/use-cases/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<import("../../3-domain/entities/task.entity").Task>;
    findAll(): Promise<import("../../3-domain/entities/task.entity").Task[]>;
    findOne(id: string): Promise<import("../../3-domain/entities/task.entity").Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("../../3-domain/entities/task.entity").Task>;
    remove(id: string): Promise<void>;
}
