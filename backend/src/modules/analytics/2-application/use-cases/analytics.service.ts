import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project, ProjectStatus } from '@/modules/projects/3-domain/entities/project.entity';
import { User, UserRole } from '@/modules/users/3-domain/entities/user.entity';
import { Payment, PaymentStatus } from '@/modules/payments/3-domain/entities/payment.entity';
import { ContentPlan, ContentPlanStatus } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
import { ShootingHours } from '@/modules/project-details/3-domain/entities/shooting-hours.entity';
import { BudgetHistory } from '@/modules/project-details/3-domain/entities/budget-history.entity';
import { Between } from 'typeorm';


@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(ContentPlan)
    private contentPlansRepository: Repository<ContentPlan>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getProjectAnalytics() {
    const totalProjects = await this.projectsRepository.count();
    const activeProjects = await this.projectsRepository.count({ where: { status: ProjectStatus.ACTIVE } });
    const completedProjects = await this.projectsRepository.count({ where: { status: ProjectStatus.COMPLETED } });
    const pausedProjects = await this.projectsRepository.count({ where: { status: ProjectStatus.PAUSED } });

    const projectsByStatus = await this.projectsRepository
      .createQueryBuilder('project')
      .select('project.status', 'status')
      .addSelect('COUNT(project.id)', 'count')
      .groupBy('project.status')
      .getRawMany();

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      pausedProjects,
      projectsByStatus,
    };
  }

  async getFinancialAnalytics(startDate?: Date, endDate?: Date) {
    const query: any = {};
    if (startDate && endDate) {
      query.createdAt = Between(startDate, endDate);
    }

    const totalIncome = await this.paymentsRepository.sum('amount', query);
    const pendingPayments = await this.paymentsRepository.count({ where: { status: PaymentStatus.PENDING } });
    const overduePayments = await this.paymentsRepository.count({ where: { status: PaymentStatus.OVERDUE } });

    const paymentsByStatus = await this.paymentsRepository
      .createQueryBuilder('payment')
      .select('payment.status', 'status')
      .addSelect('SUM(payment.amount)', 'totalAmount')
      .groupBy('payment.status')
      .getRawMany();

    return {
      totalIncome,
      pendingPayments,
      overduePayments,
      paymentsByStatus,
    };
  }

  async getContentAnalytics() {
    const totalContentPlans = await this.contentPlansRepository.count();
    const completedContentPlans = await this.contentPlansRepository.count({ where: { status: ContentPlanStatus.COMPLETED } });

    const contentPlanProgress = await this.contentPlansRepository
      .createQueryBuilder('contentPlan')
      .select('contentPlan.status', 'status')
      .addSelect('AVG(contentPlan.progress)', 'averageProgress')
      .groupBy('contentPlan.status')
      .getRawMany();

    return {
      totalContentPlans,
      completedContentPlans,
      contentPlanProgress,
    };
  }

  async getSpecialistAnalytics() {
    const totalSpecialists = await this.usersRepository.count({ where: { role: In([UserRole.SPECIALIST, UserRole.CONTENT_MAKER]) } });

    const specialistsWithProjects = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.assignedProjects', 'assignedProjects')
      .leftJoinAndSelect('user.contentMakerProjects', 'contentMakerProjects')
      .where('user.role IN (:...roles)', { roles: [UserRole.SPECIALIST, UserRole.CONTENT_MAKER] })
      .getMany();

    const specialistDetails = specialistsWithProjects.map(s => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      role: s.role,
      projectCount: s.assignedProjects.length + s.contentMakerProjects.length,
    }));

    return {
      totalSpecialists,
      specialistDetails,
    };
  }
}
