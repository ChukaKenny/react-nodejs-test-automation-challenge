const { test, expect } = require('@playwright/test');
const { pageManager } = require('../objectRepository/pageManager');
const fixtures = require('../fixtures/fixtures.json');

test.describe('Basic E2E userflows on the Task Manager App', () => {

  test.beforeEach(async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.loginPage.login();
  });

  test('User should be able to login successfully', async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.loginPage.assertThatLoginWasSuccessful()
  });

  test('User should be able to create tasks successfully', async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.taskPage.createTask()
    await PageManager.taskPage.assertThatTaskWasCreated()
  });

  test('User should be able to edit tasks successsfully', async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.taskPage.editFirstTask()
    await PageManager.taskPage.assertThatTheTaskWasEdited()
  });

  test('User should be able to delete tasks successfully', async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.taskPage.deleteLastTask();
    await PageManager.taskPage.assertThatTaskWasDeleted();
  });

});

 
