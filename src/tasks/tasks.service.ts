import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { createTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Expose tasks 
  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDTO: createTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    //push to task array in the service
    this.tasks.push(task);
    return task;
  }
}
