import { TaskStatus } from "../tasks.model";
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class searchFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.OPEN, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}