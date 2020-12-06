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

  async getTasksById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  async getTasks(filterDto: searchFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTask(filterDto);
  }

  async createTask(createTaskDTO: createTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTasksById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
