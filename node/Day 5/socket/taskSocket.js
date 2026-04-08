// socket/taskSocket.js
const taskService = require('../services/taskService');

module.exports = function registerTaskSocket(io) {

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Client requests current task list on connect
    socket.on('tasks:request', async () => {
      try {
        const tasks = await taskService.getTasks();
        socket.emit('tasks:list', tasks); // send only to this client
      } catch (err) {
        console.error('Error loading tasks:', err);
        socket.emit('error', { message: 'Failed to load tasks' });
      }
    });

    // Client creates a task
    socket.on('task:create', async ({ title }) => {
      try {
        if (!title?.trim()) {
          return socket.emit('error', { message: 'Title is required' });
        }
        const newTask = await taskService.addTask(title);
        io.emit('task:created', newTask); // broadcast to ALL clients
      } catch (err) {
        console.error('Error creating task:', err);
        socket.emit('error', { message: 'Failed to create task' });
      }
    });

    // Client deletes a task
    socket.on('task:delete', async ({ id }) => {
      try {
        await taskService.deleteTask(id);
        io.emit('task:deleted', { id });
      } catch (err) {
        console.error('Error deleting task:', err);
        const msg = err.message === 'Task not found' || err.message === 'Invalid task ID'
          ? 'Task not found'
          : 'Failed to delete task';
        socket.emit('error', { message: msg });
      }
    });

    // Client marks a task done/undone
    socket.on('task:toggle', async ({ id }) => {
      try {
        const task = await taskService.toggleTask(id);
        io.emit('task:updated', task); // broadcast the updated task
      } catch (err) {
        console.error('Error toggling task:', err);
        const msg = err.message === 'Task not found' || err.message === 'Invalid task ID'
          ? 'Task not found'
          : 'Failed to update task';
        socket.emit('error', { message: msg });
      }
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client disconnected: ${socket.id} — ${reason}`);
    });
  });
};