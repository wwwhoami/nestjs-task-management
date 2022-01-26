import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'name',
  id: 'id',
  password: 'password',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls tasksRepository.getTasks and returns the result', async () => {
      const expected = 'value';

      tasksRepository.getTasks.mockResolvedValue(expected);
      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toEqual(expected);
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'title',
        description: 'description',
        id: 'someid',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById(mockTask.id, mockUser);

      expect(result).toEqual(mockTask);
    });
    it('calls TasksRepository.findOne and handles the error', async () => {
      const id = 'someid';
      const expectedError = new NotFoundException(
        `Task with ID ${id} not found`,
      );

      tasksRepository.findOne.mockResolvedValue(null);
      const result = tasksService.getTaskById(id, mockUser);

      expect(result).rejects.toThrowError(expectedError);
    });
  });
});
