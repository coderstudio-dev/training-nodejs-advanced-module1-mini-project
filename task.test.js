const fs = require('fs').promises;
const events = require('events');
const TaskManager = require('./task');

jest.mock('fs', () => ({
  promises: {
    appendFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('Mocked Log Data'))
  }
}));

jest.mock('events');

describe('TaskManager', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  it('should add a task and emit an event after its duration', async () => {
    const mockEmit = jest.fn();
    taskManager.emit = mockEmit;

    const task = { name: 'Test Task', duration: 1 };
    await taskManager.addTask(task);

    expect(mockEmit).toHaveBeenCalledWith('taskCompleted', task);
  });

  it('should log a task by appending to a file', async () => {
    const task = { name: 'Test Task', duration: 1 };
    await taskManager.logTask(task);

    expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), expect.stringContaining(task.name));
  });

  it('should list all scheduled tasks', () => {
    const task1 = { name: 'Task 1', duration: 1000 };
    const task2 = { name: 'Task 2', duration: 2000 };
    taskManager.tasks = [task1, task2];

    console.log = jest.fn();
    taskManager.listTasks();

    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(task1.name));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(task2.name));
  });

  it('should read and display the task log', async () => {
    // Mock console.log
    console.log = jest.fn();

    // Mock fs.readFile to return a Promise that resolves with mock data
    fs.readFile.mockResolvedValue('Mocked Log Data');

    // Run the function
    await taskManager.viewLog();

    // Check if fs.readFile was called correctly
    expect(fs.readFile).toHaveBeenCalledWith(expect.any(String), 'utf8');

    // Check if console.log was called with the mock data
    expect(console.log).toHaveBeenCalledWith('Completed Tasks Log:\n', 'Mocked Log Data');
  });

});
