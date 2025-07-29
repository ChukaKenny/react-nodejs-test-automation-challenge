
const { loginPage } = require('./loginPage');
const { TaskPage } = require('./taskPage');

class pageManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new loginPage(page);
    this.taskPage = new TaskPage(page);
  }
}

module.exports = { pageManager };
