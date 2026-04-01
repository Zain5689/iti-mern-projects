// Connect to the Node.js server
const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling']
});

// DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const submitBtn = document.getElementById('submitBtn');
const tasksList = document.getElementById('tasksList');
const taskCount = document.getElementById('taskCount');
const connectionStatus = document.getElementById('connectionStatus');
const errorContainer = document.getElementById('errorContainer');

let tasks = [];
let currentFilter = 'all'; // 'all', 'active', 'completed'
let isSubmitting = false;

// Connection event handlers
socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
    updateConnectionStatus(true);
    submitBtn.disabled = false;
    
    // Request existing tasks after connection
    socket.emit('tasks:request');
    showToast('Connected to server!', 'success');
});

socket.on('disconnect', (reason) => {
    console.log('Disconnected from server:', reason);
    updateConnectionStatus(false);
    submitBtn.disabled = true;
    
    // Show disconnected state
    tasksList.innerHTML = `
        <div class="empty-state">
            <p>⚠️ Disconnected from server</p>
            <p style="font-size: 14px; margin-top: 10px;">Attempting to reconnect...</p>
        </div>
    `;
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    showError('Failed to connect to server. Please check if the server is running.');
    updateConnectionStatus(false);
    submitBtn.disabled = true;
});

// Receive initial task list
socket.on('tasks:list', (receivedTasks) => {
    console.log('Received tasks:', receivedTasks);
    tasks = receivedTasks;
    renderTasks();
});

// Listen for new tasks created by any user
socket.on('task:created', (newTask) => {
    console.log('New task created:', newTask);
    
    // Add the new task to the tasks array
    tasks.unshift(newTask); // Add to beginning for newest first
    
    // Re-render the task list
    renderTasks();
    
    // Show notification for new task
    showToast(`✨ New task: "${newTask.title}"`, 'info');
});

// Listen for task updates
socket.on('task:updated', (task) => {
    console.log('Task updated:', task);
    
    // Re-render the task list
    renderTasks();
    
    // Show notification for new task
    showToast(`✨ New task: "${task.title}"`, 'info');
});


// Handle errors from server
socket.on('error', (error) => {
    console.error('Server error:', error);
    showError(error.message || 'An error occurred');
    
    // If there was an error during task creation, re-enable the submit button
    if (isSubmitting) {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add Task';
    }
});

// Handle task creation form submission
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const title = taskInput.value.trim();
    if (!title) {
        showError('Please enter a task title');
        return;
    }
    
    // Disable button and show loading state
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding...';
    
    // Emit task:create event
    socket.emit('task:create', { title });
    
    // Clear input immediately for better UX
    taskInput.value = '';
    taskInput.focus();
    
    // Fallback timeout to re-enable button if no error is received
    setTimeout(() => {
        if (isSubmitting) {
            isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Add Task';
            console.warn('Fallback timeout: re-enabled submit button');
        }
    }, 5000);
});

// Function to toggle task completion
function toggleTaskCompletion(taskId, isChecked) {
    // Find the task
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.done = isChecked;
        renderTasks();
        // Emit task:update event to server (if your server supports it)
        socket.emit('task:update', { id: taskId, done: isChecked });
        showToast(`Task "${task.title}" marked as ${isChecked ? 'completed' : 'active'}`, 'info');
    }
}

// Function to render tasks based on current filter
function renderTasks() {
    if (!tasksList) return;
    
    // Filter tasks based on current filter
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.done);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.done);
    }
    
    if (filteredTasks.length === 0) {
        let message = '';
        if (currentFilter === 'all') {
            message = '✨ No tasks yet. Be the first to add a task!';
        } else if (currentFilter === 'active') {
            message = '✅ No active tasks. All tasks are completed!';
        } else {
            message = '📝 No completed tasks yet. Complete some tasks to see them here!';
        }
        
        tasksList.innerHTML = `
            <div class="empty-state">
                <p>${message}</p>
            </div>
        `;
        taskCount.textContent = tasks.length;
        return;
    }
    
    // Sort tasks by ID (newest first - assuming larger ID means newer)
    const sortedTasks = [...filteredTasks].sort((a, b) => b.id - a.id);
    
    const tasksHTML = sortedTasks.map(task => `
        <li class="task-item" data-task-id="${task.id}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.done ? 'checked' : ''}
                onchange="toggleTaskCompletion(${task.id}, this.checked)"
            >
            <span class="task-title ${task.done ? 'completed' : ''}">${escapeHtml(task.title)}</span>
            <span class="task-id">ID: ${task.id}</span>
        </li>
    `).join('');
    
    tasksList.innerHTML = `<ul style="list-style: none;">${tasksHTML}</ul>`;
    taskCount.textContent = tasks.length;
}

// Filter buttons event listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active class
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update filter
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Helper function to update connection status UI
function updateConnectionStatus(isConnected) {
    if (isConnected) {
        connectionStatus.textContent = 'Connected';
        connectionStatus.className = 'connection-status connected';
    } else {
        connectionStatus.textContent = 'Disconnected';
        connectionStatus.className = 'connection-status disconnected';
    }
}

// Helper function to show error messages
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorContainer.appendChild(errorDiv);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv && errorDiv.remove) {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.3s';
            setTimeout(() => errorDiv.remove(), 300);
        }
    }, 5000);
}

// Helper function to show toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set background color based on type
    if (type === 'success') {
        toast.style.background = '#4caf50';
    } else if (type === 'error') {
        toast.style.background = '#f44336';
    } else {
        toast.style.background = '#667eea';
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make toggleTaskCompletion globally available for inline onclick
window.toggleTaskCompletion = toggleTaskCompletion;

// Optional: Request tasks when page becomes visible again
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && socket.connected) {
        socket.emit('tasks:request');
    }
});

// Focus input on page load
taskInput.focus();
