import { TaskStatus } from "../tasks.model";

export class searchFilterDTO {
  status: TaskStatus;
  search: string;
}