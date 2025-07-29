// Page object for Task actions
const { expect } = require('@playwright/test');
const selectors = require('../selectors/taskManagerApp');
const fixtures = require('../fixtures/fixtures.json');

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

  async getTaskCount() {
    return await this.taskCheckboxes.count();
  }

  async createTask() {
    const initialTaskCount_createTask = await this.getTaskCount();
    this.initialTaskCount_createTask = initialTaskCount_createTask;
    console.log(`Initial task count: ${this.initialTaskCount_createTask}`);
    await this.addButton.click();
    await this.titleInput.click();
    await this.titleInput.fill(fixtures.task.createdTitle);
    await this.descriptionInput.fill(fixtures.task.createdDescription);
    await this.prioritySelect.selectOption(fixtures.task.createdTaskPriority);
    await this.saveButton.click();
    await this.page.waitForLoadState();
    const subsequentTaskCount_createTask = await this.getTaskCount();
    this.subsequentTaskCount_createTask = subsequentTaskCount_createTask;
    console.log(`Subsequent task count: ${this.subsequentTaskCount_createTask}`);
  }

   async assertThatTaskWasCreated() {

    await expect(this.subsequentTaskCount_createTask).toBeGreaterThan(this.initialTaskCount_createTask)

    await this.createdTaskTitle.waitFor();
    expect(this.createdTaskTitle).toBeVisible();
    await this.createdTaskDescription.waitFor();
    expect(this.createdTaskDescription).toBeVisible();

   }

  async editFirstTask() {
    await this.editButtons.first().click();
    await this.titleInput.fill(fixtures.task.editTitle)
    await this.descriptionInput.fill(fixtures.task.editDescription);
    await this.prioritySelect.selectOption(fixtures.task.editPriority);
    await this.page.waitForLoadState();
    await this.saveButton.click();
    await this.page.waitForLoadState();
  }

  async assertThatTheTaskWasEdited() {

    await this.updatedTaskTitle.waitFor();
    expect(this.updatedTaskTitle).toBeVisible();
    await this.updatedTaskDescription.waitFor();
    expect(this.updatedTaskDescription).toBeVisible();

  }

  async deleteLastTask() {
    const initialTaskCount_editTask = await this.getTaskCount();
    this.initialTaskCount_editTask = initialTaskCount_editTask;
    console.log(`Initial task count: ${this.initialTaskCount_editTask}`);

    await this.page.once('dialog', async dialog => {
      await expect(dialog.message()).toContain(fixtures.deleteDialog.message);
      await dialog.accept();
    });

    await this.deleteButtons.last().click();
    await this.page.waitForLoadState();
    const subsequentTaskCount_editTask = await this.getTaskCount();
    this.subsequentTaskCount_editTask = subsequentTaskCount_editTask;
    console.log(`Subsequent task count: ${this.subsequentTaskCount_editTask}`);
  }

  async assertThatTaskWasDeleted() {

    await expect(this.initialTaskCount_editTask).toBeGreaterThan(this.subsequentTaskCount_editTask)

  }

}

module.exports = { TaskPage };
