// Page object for Task actions
const { expect } = require('@playwright/test');
const selectors = require('../selectors/taskManagerApp');
const fixtures = require('../utils/fixtures.json');

class TaskPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByTestId(selectors.task.addButton);
    this.titleInput = page.getByTestId(selectors.task.titleInput);
    this.descriptionInput = page.getByTestId(selectors.task.descriptionInput);
    this.prioritySelect = page.getByTestId(selectors.task.prioritySelect);
    this.saveButton = page.getByTestId(selectors.task.saveButton);
    this.taskCheckboxes = page.getByTestId(selectors.task.checkbox);
    this.editButtons = page.getByTestId(selectors.task.editButton);
    this.deleteButtons = page.getByTestId(selectors.task.deleteButton);
    this.createdTaskTitle = page.getByRole('heading', { name: fixtures.task.createdTitle });
    this.createdTaskDescription = page.getByText(fixtures.task.createdDescription); 
    this.updatedTaskTitle = page.getByRole('heading', { name: new RegExp(fixtures.task.editTitle, 'i') });
    this.updatedTaskDescription = page.getByText(new RegExp(fixtures.task.editDescription, 'i'));
    this.initialTaskCount_createTask =  0;
    this.subsequentTaskCount_createTask = 0;
    this.initialTaskCount_editTask =  0;
    this.subsequentTaskCount_editTask = 0;
  }
  
  // Method to get the existing task count
  async getTaskCount() {
    return await this.taskCheckboxes.count();
  }

  /**
   * Method to create a new task
   * It fills in the task details, saves the task, and verifies the task count has increased.
   * It uses the fixtures to fill in the task details.
   * It stores the initial and subsequent task counts for later assertion purposes.
   * It also logs the initial and subsequent task counts for debugging purposes.
   */
  async createTask() {
    // Get the initial task count before creating a new task
    const initialTaskCount_createTask = await this.getTaskCount();
    this.initialTaskCount_createTask = initialTaskCount_createTask;
    // Log the initial task count
    console.log(`Initial task count: ${this.initialTaskCount_createTask}`);
    // Fill in the task details , choose the approptiate priority and save the task
    await this.addButton.click();
    await this.titleInput.click();
    await this.titleInput.fill(fixtures.task.createdTitle);
    await this.descriptionInput.fill(fixtures.task.createdDescription);
    await this.prioritySelect.selectOption(fixtures.task.createdTaskPriority);
    await this.saveButton.click();
    await this.page.waitForLoadState();
    // Get the subsequent task count after creating a new task
    const subsequentTaskCount_createTask = await this.getTaskCount();
    this.subsequentTaskCount_createTask = subsequentTaskCount_createTask;
    console.log(`Subsequent task count: ${this.subsequentTaskCount_createTask}`);
  }

   /*
   * Method to assert that the task was created successfully 
   */ 
   async assertThatTaskWasCreated() {
    // Assert that the task count has increased
    await expect(this.subsequentTaskCount_createTask).toBeGreaterThan(this.initialTaskCount_createTask)
    // Assert that the created task is visible
    await this.createdTaskTitle.waitFor();
    expect(this.createdTaskTitle).toBeVisible();
    await this.createdTaskDescription.waitFor();
    expect(this.createdTaskDescription).toBeVisible();

   }

  /**
   * Method to edit the first task
   * It clicks the edit button for the first task, fills in the new details and saves the task.
   * It uses the fixtures to fill in the new task details.  
   */ 
  async editFirstTask() {
    await this.editButtons.first().click();
    await this.titleInput.fill(fixtures.task.editTitle)
    await this.descriptionInput.fill(fixtures.task.editDescription);
    await this.prioritySelect.selectOption(fixtures.task.editPriority);
    await this.page.waitForLoadState();
    await this.saveButton.click();
    await this.page.waitForLoadState();
  }

  /*
  * Method to assert that the task was edited successfully
  * It checks if the updated task title and description are visible.
  */
  async assertThatTheTaskWasEdited() {
    await this.updatedTaskTitle.waitFor();
    expect(this.updatedTaskTitle).toBeVisible();
    await this.updatedTaskDescription.waitFor();
    expect(this.updatedTaskDescription).toBeVisible();
  }
  
  /**
   * Method to delete the last task
   * It stores the initial and subsequent task counts for later assertion purposes.
   * It also logs the initial and subsequent task counts for debugging purposes.
   * It waits for a dialog to appear when the delete button is clicked,and accepts the dialog.  
   */
  async deleteLastTask() {
    // Get the initial task count before deleting a task
    const initialTaskCount_editTask = await this.getTaskCount();
    this.initialTaskCount_editTask = initialTaskCount_editTask;
    // Log the initial task count
    console.log(`Initial task count: ${this.initialTaskCount_editTask}`);
    // Wait for the dialog to appear when the delete button is clicked
    await this.page.once('dialog', async dialog => {
      await expect(dialog.message()).toContain(fixtures.deleteDialog.message);
      await dialog.accept();
    });
    // Click the delete button for the last task
    await this.deleteButtons.last().click();
    await this.page.waitForLoadState();
    // Get the subsequent task count after deleting a task
    const subsequentTaskCount_editTask = await this.getTaskCount();
    this.subsequentTaskCount_editTask = subsequentTaskCount_editTask;
    // Log the subsequent task count
    console.log(`Subsequent task count: ${this.subsequentTaskCount_editTask}`);
  }

  /* 
  * Method to assert that the task was deleted successfully
  * It checks if the initial task count is greater than the subsequent task count.
  * This means that a task was deleted successfully.
  */
  async assertThatTaskWasDeleted() {
    await expect(this.initialTaskCount_editTask).toBeGreaterThan(this.subsequentTaskCount_editTask)
  }

}

module.exports = { TaskPage };
