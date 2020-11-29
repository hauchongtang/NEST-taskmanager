import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { createTaskDTO } from './dto/create-task.dto';
import { searchFilterDTO } from './dto/search-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Expose tasks 
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskbyId(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  getTasksWithFilters(filterDto: searchFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      return this.tasks.filter(task => task.status === status);
    }

    if (search) {
      return this.tasks.filter(task => {
        task.title.includes(search);
        task.description.includes(search);
      })
    }
    return tasks;
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

  deleteTaskbyid(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskbyId(id);
    task.status = status;
    return task;
  }
}
