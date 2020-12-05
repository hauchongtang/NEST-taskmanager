import { EntityRepository, Repository } from "typeorm"
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { createTaskDTO } from './dto/create-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: createTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}