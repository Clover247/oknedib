import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '@/modules/project-details/1-presentation/dtos/create-comment.dto';
import { UpdateCommentDto } from '@/modules/project-details/1-presentation/dtos/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { projectId, authorId, taskId } = createCommentDto;

    const author = await this.usersRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const commentData: Partial<Comment> = { ...createCommentDto, author };

    if (taskId) {
      const task = await this.tasksRepository.findOneBy({ id: taskId });
      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
      }
      if (task.projectId !== projectId) {
        throw new BadRequestException(`Task ${taskId} does not belong to project ${projectId}`);
      }
      commentData.task = task;
    } else {
      const project = await this.projectsRepository.findOneBy({ id: projectId });
      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }
      commentData.project = project;
    }

    const comment = this.commentsRepository.create(commentData);
    return this.commentsRepository.save(comment);
  }

  async findAll(projectId: string): Promise<Comment[]> {
    return this.commentsRepository.find({ where: { projectId }, relations: ['author'], order: { createdAt: 'ASC' } });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id }, relations: ['author'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentsRepository.preload({
      id: id,
      ...updateCommentDto,
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return this.commentsRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
