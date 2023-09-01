# training-nodejs-advanced-module1-mini-project

## Project: 

Develop a command-line task manager that schedules and logs tasks using asynchronous operations and custom events.

We'll use Promises and async/await for file operations and task scheduling. We can use Node.js to create a Command Line Interface (CLI) application where commands are passed as parameters with the following commands:

`add`: To schedule a new task. For example, `node task.js add <taskName> <durationInMilliseconds>`

`list`: To list all scheduled tasks. For example, `node task.js list`

`log`: To view the log of completed tasks. For example, `node task.js log`

---

## Grading criteria:

Should pass the following test cases:

✓ should add a task and emit an event after its duration

✓ should log a task by appending to a file

✓ should list all scheduled tasks 

✓ should read and display the task log



