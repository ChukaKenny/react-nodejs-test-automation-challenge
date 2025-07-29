const { test, expect } = require('@playwright/test');
const { pageManager } = require('../objectRepository/pageManager');
const fixtures = require('../utils/fixtures.json');

/*
*  E2E tests for the Task Manager App
*  These tests cover basic user flows such as login, task creation, editing, and deletion
*/
test.describe('Basic E2E userflows on the Task Manager App', () => {
  /*
  * Before each test, we will login to the application
  * This ensures that the user is authenticated before performing any actions
  */ 
  test.beforeEach(async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.loginPage.login();
  });
  /*
   * Test to verify that the user can log in successfully
   * This test checks if the login functionality works as expected 
   */
  test('User should be able to login successfully', async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.loginPage.assertThatLoginWasSuccessful()
  });
  /*
  * Test to verify that the user can create tasks successfully
  * This test checks if the task creation functionality works as expected 
  */
  test('User should be able to create tasks successfully', async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.taskPage.createTask()
    await PageManager.taskPage.assertThatTaskWasCreated()
  });
  /** 
   * Test to verify that the user can edit tasks successfully
   * This test checks if the task editing functionality works as expected
   */
  test('User should be able to edit tasks successsfully', async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.taskPage.editFirstTask()
    await PageManager.taskPage.assertThatTheTaskWasEdited()
  });
  /** 
   * Test to verify that the user can delete tasks successfully
   * This test checks if the task deletion functionality works as expected
   */
  test('User should be able to delete tasks successfully', async ({ page }) => {
    const PageManager = new pageManager(page);
    await PageManager.taskPage.deleteLastTask();
    await PageManager.taskPage.assertThatTaskWasDeleted();
  });

});

 
