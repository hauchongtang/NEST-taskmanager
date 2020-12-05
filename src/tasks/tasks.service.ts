import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDTO } from './dto/create-task.dto';
import { searchFilterDTO } from './dto/search-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) { }

  // // Expose tasks 
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async getTasksById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  // getTasksWithFilters(filterDto: searchFilterDTO): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     return this.tasks.filter(task => task.status === status);
  //   }

  //   if (search) {
  //     return this.tasks.filter(task => {
  //       task.title.includes(search);
  //       task.description.includes(search);
  //     })
  //   }
  //   return tasks;
  // }

  async createTask(createTaskDTO: createTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  // deleteTaskbyid(id: string): void {
  //   const found = this.getTaskbyId(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }

  // updateStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskbyId(id);
  //   task.status = status;
  //   return task;
  // }
}
