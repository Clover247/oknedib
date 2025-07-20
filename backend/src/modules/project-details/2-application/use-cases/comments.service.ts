import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Task } from '@/modules/tasks/3-domain/entities/task.entity';
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
    const project = await this.projectsRepository.findOneBy({ id: createCommentDto.projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${createCommentDto.projectId} not found`);
    }

    const author = await this.usersRepository.findOneBy({ id: createCommentDto.authorId });
    if (!author) {
      throw new NotFoundException(`Author with ID ${createCommentDto.authorId} not found`);
    }

    const comment = this.commentsRepository.create({
      ...createCommentDto,
      project,
      author,
    });
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
