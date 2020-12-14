import { EntityRepository, Repository } from "typeorm"
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { createTaskDTO } from './dto/create-task.dto';
import { searchFilterDTO } from "./dto/search-filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTask(
    filterDto: searchFilterDTO,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(
    createTaskDTO: createTaskDTO,
    user: User,
  ): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;

    return task;
  }
}