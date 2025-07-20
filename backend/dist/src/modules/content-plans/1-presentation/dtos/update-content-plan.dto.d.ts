import { CreateContentPlanDto, CreateContentItemDto } from './create-content-plan.dto';
declare const UpdateContentItemDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateContentItemDto>>;
export declare class UpdateContentItemDto extends UpdateContentItemDto_base {
    id?: string;
}
declare const UpdateContentPlanDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateContentPlanDto>>;
export declare class UpdateContentPlanDto extends UpdateContentPlanDto_base {
}
export {};
