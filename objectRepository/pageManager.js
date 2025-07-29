const { loginPage } = require('./loginPage');
const { TaskPage } = require('./taskPage');

/** 
 * This class serves as a manager for different pages in the application.
 * It initializes the page objects for login and task management.
 */
class pageManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new loginPage(page);
    this.taskPage = new TaskPage(page);
  }
}

module.exports = { pageManager };
