// Helper function to get tasks from localStorage
function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks ? tasks : [];
  }
  
  // Helper function to save tasks to localStorage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Function to render tasks
  function renderTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the list before rendering
  
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.classList.toggle('completed', task.completed);
  
      li.innerHTML = `
        <div>
          <strong>${task.title}</strong>
          <p>${task.description}</p>
        </div>
        <div>
          <button onclick="editTask('${task.id}')">Edit</button>
          <button onclick="deleteTask('${task.id}')">Delete</button>
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion('${task.id}')">
        </div>
      `;
  
      taskList.appendChild(li);
    });
  }
  
  // Function to handle task form submission
  document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
  
    if (title && description) {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        completed: false,
      };
  
      const tasks = getTasks();
      tasks.push(newTask);
      saveTasks(tasks);
      renderTasks();
      
      // Reset form
      document.getElementById('task-form').reset();
    }
  });
  
  // Function to delete a task
  function deleteTask(id) {
    const tasks = getTasks().filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
  }
  
  // Function to edit a task
  function editTask(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);
  
    if (task) {
      document.getElementById('task-title').value = task.title;
      document.getElementById('task-description').value = task.description;
  
      // Remove the task
      deleteTask(id);
    }
  }
  
  // Function to toggle task completion
  function toggleCompletion(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);
    
    if (task) {
      task.completed = !task.completed;
      saveTasks(tasks);
      renderTasks();
    }
  }
  
  // Initial render of tasks
  renderTasks();
  