import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Payment } from '@/modules/payments/3-domain/entities/payment.entity';
import { BudgetHistory } from '@/modules/project-details/3-domain/entities/budget-history.entity';
import { ShootingHours } from '@/modules/project-details/3-domain/entities/shooting-hours.entity';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
import { ContentPlan } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
import { Task } from '@/modules/tasks/3-domain/entities/task.entity';
import { CalendarEvent } from '@/modules/google-calendar/3-domain/entities/calendar-event.entity';
export declare enum ProjectStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    ARCHIVED = "ARCHIVED",
    PAUSED = "PAUSED"
}
export declare class Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    budget: number;
    budgetForTargeting: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
    manager: User;
    managerId: string;
    specialists: User[];
    contentMakers: User[];
    payments: Payment[];
    budgetHistory: BudgetHistory[];
    shootingHours: ShootingHours[];
    comments: Comment[];
    contentPlans: ContentPlan[];
    tasks: Task[];
    calendarEvents: CalendarEvent[];
}
