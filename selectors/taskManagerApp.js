// Selectors for Task Manager App
const selectors = {
  login: {
    usernameInput: 'username-input',
    passwordInput: 'password-input',
    loginButton: 'login-button',
    welcomeMessage: 'current-user',
  },
  task: {
    addButton: 'add-task-button',
    titleInput: 'task-title-input',
    descriptionInput: 'task-description-input',
    prioritySelect: 'task-priority-select',
    saveButton: 'save-task-button',
    checkbox: /task-checkbox/i,
    editButton: /edit-task/i,
    deleteButton: /delete-task/i,
  },
};
module.exports = selectors;
