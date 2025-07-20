
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../3-domain/entities/task.entity';
import { CreateTaskDto } from '../../1-presentation/dtos/create-task.dto';
import { UpdateTaskDto } from '../../1-presentation/dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: string): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
